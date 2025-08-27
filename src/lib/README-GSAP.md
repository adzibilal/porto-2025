# GSAP Setup dan Penggunaan

GSAP (GreenSock Animation Platform) telah berhasil diinisialisasi di proyek ini dengan konfigurasi dan custom hooks untuk memudahkan pengembangan.

## File yang Dibuat

### 1. `/src/lib/gsap.ts`
File konfigurasi utama GSAP yang berisi:
- Registrasi plugin (ScrollTrigger, TextPlugin)
- Default configurations
- Preset animasi yang umum digunakan
- Initial states untuk berbagai jenis animasi

### 2. `/src/hooks/useGSAP.ts`
Custom hooks untuk memudahkan penggunaan GSAP:
- `useFadeIn(delay)` - Animasi fade in
- `useSlideInUp(delay)` - Slide in dari bawah
- `useSlideInLeft(delay)` - Slide in dari kiri
- `useSlideInRight(delay)` - Slide in dari kanan
- `useScaleIn(delay)` - Scale in animation
- `useStaggerChildren(delay)` - Animasi berurutan untuk children
- `useScrollAnimation(animation, trigger, start)` - Scroll trigger animations
- `useGSAPTimeline()` - Custom timeline

## Cara Penggunaan

### Basic Animation
```tsx
import { useFadeIn } from '@/hooks/useGSAP';

const MyComponent = () => {
  const elementRef = useFadeIn(0.5); // delay 0.5 detik

  return <div ref={elementRef as any}>Content</div>;
};
```

### Scroll Animation
```tsx
import { useScrollAnimation, animations } from '@/hooks/useGSAP';

const MyComponent = () => {
  const elementRef = useScrollAnimation(animations.slideInUp, undefined, "top 80%");

  return <div ref={elementRef as any}>Content</div>;
};
```

### Stagger Children
```tsx
import { useStaggerChildren } from '@/hooks/useGSAP';

const MyComponent = () => {
  const containerRef = useStaggerChildren(0.3);

  return (
    <div ref={containerRef as any}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>
  );
};
```

## Komponen yang Sudah Menggunakan GSAP

1. **HeroSection** - Fade in, slide up, dan stagger children
2. **AboutSection** - Scroll animations dengan slide left/right
3. **SkillsSection** - Fade in, slide up, dan stagger grid
4. **PortfolioSection** - Scale in animations untuk projects
5. **ContactSection** - Multiple scroll animations
6. **Navbar** - Fade in brand dan stagger menu items

## Plugin yang Tersedia

- **ScrollTrigger** - Untuk animasi berdasarkan scroll
- **TextPlugin** - Untuk animasi text (typing effect, dll)

## Tips Penggunaan

1. Gunakan `as any` pada ref untuk menghindari TypeScript errors
2. Sesuaikan delay untuk menciptakan efek yang natural
3. Gunakan scroll animations untuk section yang tidak langsung terlihat
4. Kombinasikan berbagai animasi untuk efek yang lebih menarik
5. Perhatikan performa, jangan terlalu banyak animasi yang berjalan bersamaan

## Customization

Anda dapat menambahkan animasi custom di file `/src/lib/gsap.ts` pada object `animations` dan `initialStates`, atau membuat custom hooks baru di `/src/hooks/useGSAP.ts`.
