<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Achievement extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'badge_color',
        'category',
        'rarity',
        'points_value',
        'criteria',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'criteria' => 'array',
            'is_active' => 'boolean',
            'points_value' => 'integer',
        ];
    }

    // Relationships

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_achievements')
            ->withTimestamps()
            ->withPivot('earned_at');
    }

    // Scopes

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    public function scopeByRarity($query, string $rarity)
    {
        return $query->where('rarity', $rarity);
    }

    public function scopePopular($query)
    {
        return $query->withCount('users')
            ->orderBy('users_count', 'desc');
    }

    // Computed Attributes

    public function getEarnedCountAttribute(): int
    {
        return $this->users()->count();
    }

    public function getRarityColorAttribute(): string
    {
        return match ($this->rarity) {
            'common' => 'gray',
            'rare' => 'blue',
            'epic' => 'purple',
            'legendary' => 'orange',
            default => 'gray',
        };
    }

    public function getRarityWeightAttribute(): int
    {
        return match ($this->rarity) {
            'common' => 1,
            'rare' => 2,
            'epic' => 3,
            'legendary' => 4,
            default => 1,
        };
    }

    /**
     * Check if a user has earned this achievement.
     */
    public function isEarnedBy(User $user): bool
    {
        return $this->users()->where('user_id', $user->id)->exists();
    }
}
