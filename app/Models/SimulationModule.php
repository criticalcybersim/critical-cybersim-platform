<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class SimulationModule extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'learning_objectives',
        'sector_id',
        'difficulty_level',
        'estimated_duration_minutes',
        'points_reward',
        'attack_type',
        'nist_controls',
        'prerequisites',
        'is_published',
        'is_featured',
        'completion_count',
        'average_score',
        'thumbnail_path',
    ];

    protected function casts(): array
    {
        return [
            'learning_objectives' => 'array',
            'nist_controls' => 'array',
            'prerequisites' => 'array',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
            'completion_count' => 'integer',
            'average_score' => 'decimal:2',
            'estimated_duration_minutes' => 'integer',
            'points_reward' => 'integer',
        ];
    }

    // Relationships

    public function sector(): BelongsTo
    {
        return $this->belongsTo(Sector::class);
    }

    public function scenarios(): HasMany
    {
        return $this->hasMany(TrainingScenario::class, 'module_id')->orderBy('order_number');
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(SimulationSession::class, 'module_id');
    }

    public function userProgress(): HasMany
    {
        return $this->hasMany(UserProgress::class, 'module_id');
    }

    public function nistControls(): BelongsToMany
    {
        return $this->belongsToMany(NistControl::class, 'nist_control_simulation_module');
    }

    // Scopes

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeByDifficulty($query, string $level)
    {
        return $query->where('difficulty_level', $level);
    }

    public function scopeBySector($query, int $sectorId)
    {
        return $query->where('sector_id', $sectorId);
    }

    public function scopeByAttackType($query, string $type)
    {
        return $query->where('attack_type', $type);
    }

    public function scopePopular($query)
    {
        return $query->orderBy('completion_count', 'desc');
    }

    public function scopeHighRated($query)
    {
        return $query->where('average_score', '>', 0)
            ->orderBy('average_score', 'desc');
    }

    // Computed Attributes

    public function getDifficultyColorAttribute(): string
    {
        return config("cybersim.difficulty_levels.{$this->difficulty_level}.color", 'gray');
    }

    public function getDifficultyBadgeAttribute(): string
    {
        return config("cybersim.difficulty_levels.{$this->difficulty_level}.name", ucfirst($this->difficulty_level));
    }

    public function getCompletionRateAttribute(): float
    {
        $totalAttempts = $this->sessions()->whereIn('status', ['completed', 'abandoned'])->count();
        if ($totalAttempts === 0) {
            return 0;
        }

        $completedSessions = $this->sessions()->where('status', 'completed')->count();

        return round(($completedSessions / $totalAttempts) * 100, 2);
    }

    public function getAttackTypeNameAttribute(): string
    {
        return config("cybersim.attack_types.{$this->attack_type}.name", ucfirst(str_replace('_', ' ', $this->attack_type)));
    }

    public function getAttackTypeIconAttribute(): string
    {
        return config("cybersim.attack_types.{$this->attack_type}.icon", 'shield-alert');
    }

    public function getAttackTypeColorAttribute(): string
    {
        return config("cybersim.attack_types.{$this->attack_type}.color", 'gray');
    }

    public function getEstimatedDurationFormattedAttribute(): string
    {
        $hours = floor($this->estimated_duration_minutes / 60);
        $minutes = $this->estimated_duration_minutes % 60;

        if ($hours > 0) {
            return $minutes > 0 ? "{$hours}h {$minutes}m" : "{$hours}h";
        }

        return "{$minutes}m";
    }
}
