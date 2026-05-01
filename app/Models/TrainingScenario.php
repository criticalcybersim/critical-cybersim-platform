<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrainingScenario extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'module_id',
        'order_number',
        'scenario_type',
        'content',
        'choices',
        'correct_actions',
        'max_score',
        'time_limit_seconds',
        'is_critical',
    ];

    protected function casts(): array
    {
        return [
            'choices' => 'array',
            'correct_actions' => 'array',
            'max_score' => 'integer',
            'time_limit_seconds' => 'integer',
            'is_critical' => 'boolean',
            'order_number' => 'integer',
        ];
    }

    // Relationships

    public function module(): BelongsTo
    {
        return $this->belongsTo(SimulationModule::class, 'module_id');
    }

    // Scopes

    public function scopeByModule($query, int $moduleId)
    {
        return $query->where('module_id', $moduleId);
    }

    public function scopeByType($query, string $type)
    {
        return $query->where('scenario_type', $type);
    }

    public function scopeCritical($query)
    {
        return $query->where('is_critical', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order_number');
    }

    // Computed Attributes

    public function getScenarioTypeNameAttribute(): string
    {
        return config("cybersim.scenario_types.{$this->scenario_type}", ucfirst(str_replace('_', ' ', $this->scenario_type)));
    }

    public function getHasTimeLimitAttribute(): bool
    {
        return $this->time_limit_seconds !== null && $this->time_limit_seconds > 0;
    }

    public function getTimeLimitFormattedAttribute(): ?string
    {
        if (! $this->has_time_limit) {
            return null;
        }

        $minutes = floor($this->time_limit_seconds / 60);
        $seconds = $this->time_limit_seconds % 60;

        if ($minutes > 0) {
            return $seconds > 0 ? "{$minutes}m {$seconds}s" : "{$minutes}m";
        }

        return "{$seconds}s";
    }

    public function getIsDecisionScenarioAttribute(): bool
    {
        return ! empty($this->choices) && is_array($this->choices);
    }
}
