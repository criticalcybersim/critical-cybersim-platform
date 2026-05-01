<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class SimulationSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_code',
        'user_id',
        'module_id',
        'status',
        'current_scenario_index',
        'score',
        'max_possible_score',
        'percentage_score',
        'time_spent_seconds',
        'decisions_made',
        'mistakes_made',
        'ai_feedback',
        'started_at',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'decisions_made' => 'array',
            'mistakes_made' => 'array',
            'current_scenario_index' => 'integer',
            'score' => 'integer',
            'max_possible_score' => 'integer',
            'percentage_score' => 'decimal:2',
            'time_spent_seconds' => 'integer',
            'started_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($session) {
            if (empty($session->session_code)) {
                $session->session_code = 'SIM-'.strtoupper(Str::random(8));
            }
        });
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

    public function scopeRecent($query)
    {
        return $query->orderBy('started_at', 'desc');
    }

    // Computed Attributes

    public function getIsCompletedAttribute(): bool
    {
        return $this->status === 'completed';
    }

    public function getIsPassedAttribute(): bool
    {
        if (! $this->is_completed) {
            return false;
        }

        return $this->percentage_score >= config('cybersim.passing_score', 70);
    }

    public function getPerformanceGradeAttribute(): string
    {
        if (! $this->is_completed) {
            return 'N/A';
        }

        $score = $this->percentage_score;

        if ($score >= 90) {
            return 'A';
        }
        if ($score >= 80) {
            return 'B';
        }
        if ($score >= 70) {
            return 'C';
        }
        if ($score >= 60) {
            return 'D';
        }

        return 'F';
    }

    public function getDurationFormattedAttribute(): string
    {
        $hours = floor($this->time_spent_seconds / 3600);
        $minutes = floor(($this->time_spent_seconds % 3600) / 60);
        $seconds = $this->time_spent_seconds % 60;

        if ($hours > 0) {
            return sprintf('%dh %dm %ds', $hours, $minutes, $seconds);
        }

        if ($minutes > 0) {
            return sprintf('%dm %ds', $minutes, $seconds);
        }

        return sprintf('%ds', $seconds);
    }

    public function getMistakesCountAttribute(): int
    {
        return is_array($this->mistakes_made) ? count($this->mistakes_made) : 0;
    }

    public function getStatusBadgeColorAttribute(): string
    {
        return match ($this->status) {
            'completed' => 'green',
            'in_progress' => 'blue',
            'paused' => 'yellow',
            'abandoned' => 'red',
            default => 'gray',
        };
    }
}
