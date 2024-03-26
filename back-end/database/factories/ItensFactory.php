<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Itens>
 */
class ItensFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'codigo' => Str::random(10),
            'title' => fake()->name(),
            'desc'  => fake()->text(50),
            'value' => fake()->randomNumber(3),
            'statusIten' => 1,
            'qtdIten' => fake()->randomNumber(),
            'slug' => fake()->name(),
            'urlImage' => $this->faker->imageUrl(480, 480),
            'idCategory' => fake()->numberBetween(5, 12),
            'waitTime' => fake()->randomNumber(1).' - '.fake()->randomNumber(2).' minutes',
            'position'=> 'entrada'
        ];
    }
}
