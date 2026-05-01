<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAchievement extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'achievement_id',
        'earned_at',
    ];

    protected function casts(): array
    {
        return [
            'earned_at' => 'datetime',
        ];
    }

    // Relationships

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function achievement(): BelongsTo
    {
        return $this->belongsTo(Achievement::class);
    }

    // Scopes

    public function scopeByUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByAchievement($query, int $achievementId)
    {
        return $query->where('achievement_id', $achievementId);
    }

    public function scopeRecent($query)
    {
        return $query->orderBy('earned_at', 'desc');
    }

    public function scopeEarnedToday($query)
    {
        return $query->whereDate('earned_at', today());
    }

    public function scopeEarnedThisWeek($query)
    {
        return $query->whereBetween('earned_at', [now()->startOfWeek(), now()->endOfWeek()]);
    }

    public function scopeEarnedThisMonth($query)
    {
        return $query->whereMonth('earned_at', now()->month)
            ->whereYear('earned_at', now()->year);
    }
}
