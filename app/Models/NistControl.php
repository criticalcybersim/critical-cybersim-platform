<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class NistControl extends Model
{
    use HasFactory;

    protected $fillable = [
        'control_id',
        'control_family',
        'control_family_code',
        'title',
        'description',
        'impact_level',
        'is_baseline',
        'related_controls',
    ];

    protected function casts(): array
    {
        return [
            'is_baseline' => 'boolean',
            'related_controls' => 'array',
        ];
    }

    // Relationships

    public function simulationModules(): BelongsToMany
    {
        return $this->belongsToMany(SimulationModule::class, 'nist_control_simulation_module');
    }

    // Scopes

    public function scopeByFamily($query, string $familyCode)
    {
        return $query->where('control_family_code', $familyCode);
    }

    public function scopeByImpactLevel($query, string $level)
    {
        return $query->where('impact_level', $level);
    }

    public function scopeBaseline($query)
    {
        return $query->where('is_baseline', true);
    }

    public function scopeSearchByControlId($query, string $search)
    {
        return $query->where('control_id', 'like', "%{$search}%");
    }

    // Computed Attributes

    public function getControlFamilyNameAttribute(): string
    {
        return config("nist.control_families.{$this->control_family_code}.name", $this->control_family);
    }

    public function getControlFamilyColorAttribute(): string
    {
        return config("nist.control_families.{$this->control_family_code}.color", '#6B7280');
    }

    public function getControlFamilyIconAttribute(): string
    {
        return config("nist.control_families.{$this->control_family_code}.icon", 'shield');
    }

    public function getImpactLevelColorAttribute(): string
    {
        return config("nist.impact_levels.{$this->impact_level}.color", 'gray');
    }

    public function getModulesCountAttribute(): int
    {
        return $this->simulationModules()->count();
    }
}
