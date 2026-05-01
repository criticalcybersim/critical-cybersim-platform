<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProgress extends Model
{
    use HasFactory;

    protected $table = 'user_progress';

    protected $fillable = [
        'user_id',
        'module_id',
        'status',
        'attempts',
        'best_score',
        'latest_score',
        'completion_percentage',
        'points_earned',
        'first_started_at',
        'completed_at',
        'last_attempted_at',
    ];

    protected function casts(): array
    {
        return [
            'attempts' => 'integer',
            'best_score' => 'integer',
            'latest_score' => 'integer',
            'completion_percentage' => 'decimal:2',
            'points_earned' => 'integer',
            'first_started_at' => 'datetime',
            'completed_at' => 'datetime',
            'last_attempted_at' => 'datetime',
        ];
    }

    // Relationships

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function module(): BelongsTo
    {
        return $this->belongsTo(SimulationModule::class, 'module_id');
    }

    // Scopes

    public function scopeByUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByModule($query, int $moduleId)
    {
        return $query->where('module_id', $moduleId);
    }

    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', 'in_progress');
    }

    public function scopeNotStarted($query)
    {
        return $query->where('status', 'not_started');
    }

    // Computed Attributes

    public function getIsCompletedAttribute(): bool
    {
        return $this->status === 'completed';
    }

    public function getIsInProgressAttribute(): bool
    {
        return $this->status === 'in_progress';
    }

    public function getHasImprovedAttribute(): bool
    {
        return $this->attempts > 1 && $this->latest_score > $this->best_score;
    }

    public function getImprovementPercentageAttribute(): float
    {
        if ($this->attempts <= 1 || $this->best_score === 0) {
            return 0;
        }

        $firstScore = $this->latest_score; // Assuming latest is from first attempt
        $improvement = (($this->best_score - $firstScore) / $firstScore) * 100;

        return round($improvement, 2);
    }

    public function getStatusBadgeColorAttribute(): string
    {
        return match ($this->status) {
            'completed' => 'green',
            'in_progress' => 'blue',
            'not_started' => 'gray',
            default => 'gray',
        };
    }
}
