<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, HasRoles, LogsActivity, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'organization_id',
        'sector_id',
        'job_title',
        'experience_level',
        'total_points',
        'current_streak',
        'last_active_at',
        'preferences',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'last_active_at' => 'datetime',
            'preferences' => 'array',
            'experience_level' => 'integer',
            'total_points' => 'integer',
            'current_streak' => 'integer',
        ];
    }

    /**
     * Get the attributes that should be logged.
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'email', 'role', 'organization_id', 'sector_id', 'total_points'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    // Relationships

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function sector(): BelongsTo
    {
        return $this->belongsTo(Sector::class);
    }

    public function simulationSessions(): HasMany
    {
        return $this->hasMany(SimulationSession::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(UserProgress::class);
    }

    public function achievements(): BelongsToMany
    {
        return $this->belongsToMany(Achievement::class, 'user_achievements')
            ->withTimestamps()
            ->withPivot('earned_at');
    }

    // Scopes

    public function scopeByOrganization($query, $orgId)
    {
        return $query->where('organization_id', $orgId);
    }

    public function scopeBySector($query, $sectorId)
    {
        return $query->where('sector_id', $sectorId);
    }

    public function scopeByRole($query, $role)
    {
        return $query->where('role', $role);
    }

    public function scopeActive($query)
    {
        return $query->whereNotNull('last_active_at')
            ->where('last_active_at', '>=', now()->subDays(30));
    }

    // Computed Attributes

    public function getCompletionRateAttribute(): float
    {
        $totalModules = SimulationModule::where('is_published', true)->count();
        if ($totalModules === 0) {
            return 0;
        }

        $completedModules = $this->progress()
            ->where('status', 'completed')
            ->count();

        return round(($completedModules / $totalModules) * 100, 2);
    }

    public function getAverageScoreAttribute(): float
    {
        return $this->simulationSessions()
            ->where('status', 'completed')
            ->avg('percentage_score') ?? 0;
    }

    public function getLevelAttribute(): int
    {
        $levels = config('cybersim.levels');

        foreach ($levels as $level => $config) {
            if ($this->total_points >= $config['min_points'] && $this->total_points <= $config['max_points']) {
                return $level;
            }
        }

        return 1;
    }

    public function getLevelNameAttribute(): string
    {
        $level = $this->level;

        return config("cybersim.levels.{$level}.name", 'Novice');
    }

    public function getLevelColorAttribute(): string
    {
        $level = $this->level;

        return config("cybersim.levels.{$level}.color", 'slate');
    }

    public function getNextLevelPointsAttribute(): int
    {
        $currentLevel = $this->level;
        $nextLevel = $currentLevel + 1;

        if (! isset(config('cybersim.levels')[$nextLevel])) {
            return 0;
        }

        return config("cybersim.levels.{$nextLevel}.min_points");
    }

    public function getProgressToNextLevelAttribute(): float
    {
        $currentLevel = $this->level;
        $currentLevelMin = config("cybersim.levels.{$currentLevel}.min_points");
        $nextLevelPoints = $this->next_level_points;

        if ($nextLevelPoints === 0) {
            return 100;
        }

        $pointsInCurrentLevel = $nextLevelPoints - $currentLevelMin;
        $pointsEarned = $this->total_points - $currentLevelMin;

        return round(($pointsEarned / $pointsInCurrentLevel) * 100, 2);
    }

    public function getIsAdminAttribute(): bool
    {
        return in_array($this->role, ['admin', 'super_admin']);
    }

    public function getIsSuperAdminAttribute(): bool
    {
        return $this->role === 'super_admin';
    }
}
