<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sector extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'cisa_designation',
        'description',
        'icon',
        'color',
        'threat_level',
        'module_count',
        'is_active',
        'sort_order',
        'key_threats',
        'regulatory_frameworks',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'module_count' => 'integer',
            'sort_order' => 'integer',
            'key_threats' => 'array',
            'regulatory_frameworks' => 'array',
        ];
    }

    // Relationships

    public function simulationModules(): HasMany
    {
        return $this->hasMany(SimulationModule::class);
    }

    public function organizations(): HasMany
    {
        return $this->hasMany(Organization::class, 'primary_sector_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    // Scopes

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByThreatLevel($query, string $level)
    {
        return $query->where('threat_level', $level);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    // Computed Attributes

    public function getPublishedModulesCountAttribute(): int
    {
        return $this->simulationModules()->where('is_published', true)->count();
    }

    public function getThreatLevelBadgeAttribute(): string
    {
        return config("sectors.threat_levels.{$this->threat_level}.badge", 'Unknown');
    }

    public function getThreatLevelColorAttribute(): string
    {
        return config("sectors.threat_levels.{$this->threat_level}.color", 'gray');
    }
}
