<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Organization extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'primary_sector_id',
        'size',
        'country',
        'state',
        'description',
        'logo_path',
        'is_active',
        'settings',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'settings' => 'array',
        ];
    }

    // Relationships

    public function primarySector(): BelongsTo
    {
        return $this->belongsTo(Sector::class, 'primary_sector_id');
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

    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }

    public function scopeBySector($query, int $sectorId)
    {
        return $query->where('primary_sector_id', $sectorId);
    }

    // Computed Attributes

    public function getUserCountAttribute(): int
    {
        return $this->users()->count();
    }

    public function getAverageCompletionRateAttribute(): float
    {
        $users = $this->users;
        if ($users->isEmpty()) {
            return 0;
        }

        return round($users->avg(fn ($user) => $user->completion_rate), 2);
    }
}
