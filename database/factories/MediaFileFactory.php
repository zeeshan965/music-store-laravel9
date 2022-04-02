<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MediaFile>
 */
class MediaFileFactory extends Factory
{
    /**
     * Define the model's default state.
     * @return array
     */
    public function definition(): array
    {

        $gallery_images = [
            url("img/gallery/no_preview.png"),
            url("img/gallery/img1_small.jpg"),
            url("img/gallery/img2_small.jpg"),
            url("img/gallery/img3_small.jpg"),
            url("img/gallery/img4_small.jpg"),
            url("img/gallery/img5_small.jpg"),
            url("img/gallery/img6_small.jpg"),
            url("img/gallery/img7_small.jpg"),
            url("img/gallery/img8_small.jpg"),
            url("img/gallery/img9_small.jpg"),
            url("img/gallery/img10_small.jpg"),
        ];

        $name = $this->faker->firstName() . " - Song " . $this->faker->domainName() . " ft. " . $this->faker->name . " - MP4 (Official Music Video)";

        return [
            'title' => $name,
            'media_type' => $this->faker->randomElement(['video', 'audio']),
            'author' => $this->faker->name(),
            'price' => $this->faker->randomElement([3.99, 4.5, 10.99, 3, 7]),
            'description' => $this->faker->realText(),
            'cover' => $this->faker->randomElement($gallery_images),
            'thumbnail' => $this->faker->randomElement($gallery_images),
            'genres' => $this->faker->randomElement(['horror', 'comedy', 'action', 'sci-fi']),
            'duration' => $this->faker->time("i:s"),
            'status' => $this->faker->numberBetween(0, 1),
            'src_url' => $this->faker->url,
            'trailer_url' => $this->faker->url(),
            'created_by' => 1,

        ];
    }
}
