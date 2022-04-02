@props(['value'])

<label {{ $attributes->merge(['class' => 'font-medium']) }}>
    {{ $value ?? $slot }}
</label>
