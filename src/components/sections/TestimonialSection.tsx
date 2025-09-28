"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import BlurText from '@/components/shared/BlurText';
import quoteIcon from '@/assets/icons/quote-icon.svg';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company?: string;
    feedback: string;
    appreciation?: string;
    recommendationScore?: number;
}

const testimonials: Testimonial[] = [
    {
        id: 'kzptio6f7he6ib4wvj4fkzptiohabsfm',
        name: 'Cheppy Andriyana',
        role: 'Fullstack Developer',
        company: 'Bara Prima Multi Teknovasi',
        feedback: 'Three Years of Collaboration',
        appreciation: 'Across three years working together, Adzi consistently delivered standout UI/UX solutions with speed, precision, and a deep understanding of the product vision.',
        recommendationScore: 9,
    },
    {
        id: 'k292kql9kia2jjk29mqqwnfpo1f0wf3q',
        name: 'Rivansyah Ahmadien',
        role: 'CTO',
        company: 'Vidya Indonesia Prima',
        feedback: 'Reliable Product Partner',
        appreciation: 'Adzi is quick to respond, tuned in to business priorities, and able to translate product vision into clean, usable interfaces that keep teams aligned.',
        recommendationScore: 8,
    },
    {
        id: '4thou6f49u4g6ja84thoh4vecmgqauhp',
        name: 'Rahman Faruq Rajabiyansyahr',
        role: 'UI/UX Designer',
        company: 'PT MENCETAK BANYAK GOL',
        feedback: 'Positive Design Partnership',
        appreciation: 'Working with Adzi is always positive. His design taste is sharp, he works smart, and he shares practical tips that streamline the entire team’s workflow.',
        recommendationScore: 8,
    },
    {
        id: 'lddhb8794el67cyfkz3vnmlddhb87wju',
        name: 'Rizki Awanta Jordhie',
        role: 'Consultant',
        company: 'SMP',
        feedback: 'Collaborative Problem Solver',
        appreciation: 'Adzi brings clear vision and strong problem-solving skills to every challenge, keeping collaboration smooth while balancing big-picture strategy with technical detail.',
    },
    {
        id: 'k3wcz1r31hk0gu51npnk3wcxypu3zbm9',
        name: 'Dwi',
        role: 'Frontend Developer',
        company: 'Jumpa Daring Indonesia',
        feedback: 'Responsive Collaboration',
        appreciation: 'Working with Adzi was a positive experience overall. He quickly addressed communication gaps, stayed collaborative, and kept the process efficient through open feedback loops.',
        recommendationScore: 10,
    },
    {
        id: 'k6hu3amqko3yosldvosyxhn2k6hu3az4',
        name: 'Kevin Naserwan',
        role: 'Fullstack Developer',
        company: 'Hashmicro',
        feedback: 'Exceeded Expectations',
        appreciation: 'Working with Adzi was excellent. He blends attention to detail with proactive communication, turning complex requirements into clean, user-friendly interfaces that surpassed our goals.',
        recommendationScore: 8,
    },
    {
        id: 'h442p58q5jsnoqracbn2jh442p5870hh',
        name: 'Ihsan Fajar Ramadhan',
        role: 'Project Manager',
        company: 'Lontarlab Foundation',
        feedback: 'Creative Synergy',
        appreciation: 'Brainstorming with Adzi is energizing—he brings passion, turns ambitious ideas into real solutions, and keeps the whole team inspired throughout delivery.',
        recommendationScore: 10,
    },
    {
        id: 'son1fv2dkwvsbilw9vxf6son1fvv8a8k',
        name: 'Nur Sasongko',
        role: 'Full Stack Web Dev',
        company: 'Motiolabs',
        feedback: 'Outstanding Commitment',
        appreciation: 'Partnering with Adzi is always a pleasure. He keeps learning, adapts quickly, and stays a dependable teammate through every sprint and delivery milestone.',
        recommendationScore: 9,
    },
    {
        id: '27-08-2025-risman',
        name: 'Risman',
        role: 'Fullstack Developer',
        company: 'Motiolabs',
        feedback: 'Rapid Delivery',
        appreciation: 'Adzi works fast without sacrificing quality. His pace and reliability were crucial on our Project Muda Kerja initiatives.',
        recommendationScore: 9,
    },
    {
        id: '27-08-2025-arie-lesmana-hidayat',
        name: 'Arie Lesmana Hidayat',
        role: 'System Analyst',
        company: 'PT Motiolabs Digital Indonesia',
        feedback: 'Creative and Reliable',
        appreciation: 'Over two years collaborating, Adzi kept surprising us with fast learning, fresh ideas, and steady delivery we could depend on.',
        recommendationScore: 10,
    },
    {
        id: '27-08-2025-saldi-supriyadi',
        name: 'Saldi Supriadi',
        role: 'Project Manager',
        feedback: 'Reliable Execution',
        appreciation: 'Adzi brings a balanced approach—steady communication, accountable ownership, and outcomes that keep stakeholders satisfied.',
        recommendationScore: 8,
    },
    {
        id: '28-08-2025-putri-puspita',
        name: 'Putri Puspita',
        role: 'Business Development Manager',
        company: 'PT Motiolabs Digital Indonesia',
        feedback: 'Eager to Grow',
        appreciation: 'Adzi shows real hunger to learn. Even on brief engagements, he absorbs requirements quickly and turns them into thoughtful execution.',
        recommendationScore: 8,
    },
    {
        id: '28-08-2025-andika-rizki-ramdani',
        name: 'Andika Rizki Ramdani',
        role: 'Frontend Developer',
        company: 'Aestech',
        feedback: 'Continuous Improvement',
        appreciation: 'There is always something new to learn from Adzi. He thrives on exploration, stays detail-oriented, and elevates the team’s standards.',
        recommendationScore: 9,
    },
    {
        id: '01-09-2025-dyky-jaka-maulana',
        name: 'Dyky Jaka Maulana',
        role: 'Human Capital',
        company: 'PT. Swamedia Informatika',
        feedback: 'Responsible and Driven',
        appreciation: 'Adzi brings energy, accountability, and a genuine willingness to grow. His skill set keeps expanding, and his dedication stands out.',
        recommendationScore: 9,
    },
];

const AUTO_SCROLL_SPEED = 80; // pixels per second

const TestimonialSection = () => {
    const handleAnimationComplete = () => {
        console.log('Testimonial animation completed!');
    };

    const containerRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const isDraggingRef = useRef(false);
    const lastPointerXRef = useRef(0);
    const singleSetWidthRef = useRef(0);
    const animationFrameRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);
    const isAutoScrollingRef = useRef(true);
    const autoResumeTimeoutRef = useRef<number | null>(null);
    const currentScrollRef = useRef(0);

    const duplicatedTestimonials = React.useMemo(() => [...testimonials, ...testimonials], []);

    const renderCard = (testimonial: Testimonial, index: number, key: string) => (
        <div
            key={key}
            className={`${index % 2 === 0 ? 'bg-zinc-50 dark:bg-gray-800' : 'bg-zinc-100 dark:bg-gray-700'} p-6 md:p-8 lg:p-[4rem] flex flex-col justify-between min-h-[400px] md:min-h-[450px] lg:min-h-[500px] transition-colors duration-300 relative flex-shrink-0`}
        >
            {typeof testimonial.recommendationScore === 'number' && (
                <div className="absolute top-6 right-6 flex items-center gap-2 text-black">
                    <StarIcon className="w-5 h-5" />
                    <span className="text-sm md:text-base font-semibold">
                        {testimonial.recommendationScore}/10
                    </span>
                </div>
            )}
            <Image src={quoteIcon} alt="quote" width={40} height={40} className='mb-4 md:mb-6 lg:mb-[2rem]' />
            <div>
                <div className="text-lg md:text-2xl text-zinc-900 dark:text-zinc-100 font-semibold transition-colors duration-300">{testimonial.feedback}</div>
                {testimonial.appreciation && (
                    <div className="text-sm md:text-lg text-zinc-500 dark:text-zinc-400 mt-3 md:mt-4 lg:mt-[1rem] leading-relaxed transition-colors duration-300">
                        {testimonial.appreciation}
                    </div>
                )}
            </div>
            <div className="flex items-center gap-3 mt-6 md:mt-8 lg:mt-[2rem]">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-900 dark:bg-zinc-600 rounded-full transition-colors duration-300"></div>
                <div>
                    <div className="text-lg md:text-xl text-zinc-900 dark:text-zinc-100 font-semibold transition-colors duration-300">{testimonial.name}</div>
                    <div className="font-meta text-zinc-500 dark:text-zinc-400 italic text-xs md:text-sm transition-colors duration-300">
                        {testimonial.role}
                        {testimonial.company ? ` @ ${testimonial.company}` : ''}
                    </div>
                </div>
            </div>
        </div>
    );

    const applyScrollPosition = (value: number) => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        currentScrollRef.current = value;
        const width = singleSetWidthRef.current;

        if (width <= 0) {
            container.scrollLeft = value;
            return;
        }

        const normalized = ((value % width) + width) % width;
        container.scrollLeft = normalized;
    };

    const scheduleAutoScrollResume = () => {
        if (autoResumeTimeoutRef.current) {
            window.clearTimeout(autoResumeTimeoutRef.current);
        }

        autoResumeTimeoutRef.current = window.setTimeout(() => {
            lastTimestampRef.current = null;
            isAutoScrollingRef.current = true;
        }, 1200);
    };

    useEffect(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) {
            return undefined;
        }

        const updateSingleSetWidth = () => {
            const trackWidth = track.scrollWidth;
            singleSetWidthRef.current = trackWidth > 0 ? trackWidth / 2 : 0;
        };

        updateSingleSetWidth();
        currentScrollRef.current = container.scrollLeft;

        const resizeObserver = new ResizeObserver(() => {
            updateSingleSetWidth();
            applyScrollPosition(currentScrollRef.current);
        });

        resizeObserver.observe(track);

        const handleWindowResize = () => {
            updateSingleSetWidth();
            applyScrollPosition(currentScrollRef.current);
        };

        window.addEventListener('resize', handleWindowResize);

        const handleVisibilityChange = () => {
            if (document.hidden) {
                isAutoScrollingRef.current = false;
            } else {
                lastTimestampRef.current = null;
                isAutoScrollingRef.current = true;
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        const step = (timestamp: number) => {
            if (lastTimestampRef.current === null) {
                lastTimestampRef.current = timestamp;
            }

            const delta = timestamp - (lastTimestampRef.current ?? timestamp);
            lastTimestampRef.current = timestamp;

            if (isAutoScrollingRef.current && singleSetWidthRef.current > 0) {
                const distance = (AUTO_SCROLL_SPEED * delta) / 1000;
                applyScrollPosition(currentScrollRef.current + distance);
            }

            animationFrameRef.current = requestAnimationFrame(step);
        };

        animationFrameRef.current = requestAnimationFrame(step);

        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            resizeObserver.disconnect();
            window.removeEventListener('resize', handleWindowResize);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return undefined;
        }

        const handlePointerDown = (event: PointerEvent) => {
            if (event.pointerType === 'mouse' && event.button !== 0) {
                return;
            }
            event.preventDefault();
            isDraggingRef.current = true;
            isAutoScrollingRef.current = false;
            lastPointerXRef.current = event.clientX;
            container.classList.add('dragging');
            if (autoResumeTimeoutRef.current) {
                window.clearTimeout(autoResumeTimeoutRef.current);
            }
            container.setPointerCapture(event.pointerId);
        };

        const handlePointerMove = (event: PointerEvent) => {
            if (!isDraggingRef.current) {
                return;
            }
            event.preventDefault();
            const delta = event.clientX - lastPointerXRef.current;
            lastPointerXRef.current = event.clientX;
            applyScrollPosition(currentScrollRef.current - delta);
        };

        const handlePointerUp = (event?: PointerEvent) => {
            if (!isDraggingRef.current) {
                return;
            }
            if (event) {
                event.preventDefault();
            }
            isDraggingRef.current = false;
            container.classList.remove('dragging');
            if (event) {
                container.releasePointerCapture(event.pointerId);
            }
            scheduleAutoScrollResume();
        };

        container.addEventListener('pointerdown', handlePointerDown, { passive: false });
        container.addEventListener('pointermove', handlePointerMove, { passive: false });
        container.addEventListener('pointerup', handlePointerUp, { passive: false });
        container.addEventListener('pointercancel', handlePointerUp, { passive: false });
        container.addEventListener('pointerleave', () => handlePointerUp(), { passive: false });

        return () => {
            if (autoResumeTimeoutRef.current) {
                window.clearTimeout(autoResumeTimeoutRef.current);
            }
            container.removeEventListener('pointerdown', handlePointerDown);
            container.removeEventListener('pointermove', handlePointerMove);
            container.removeEventListener('pointerup', handlePointerUp);
            container.removeEventListener('pointercancel', handlePointerUp);
            container.removeEventListener('pointerleave', () => handlePointerUp());
        };
    }, []);

    return (
        <section className="testimonial-section ">
            <div className="bg-white dark:bg-gray-900 px-4 md:px-8 lg:px-[6rem] pt-8 md:pt-16 lg:pt-[8rem] pb-8 md:pb-12 lg:pb-[5rem] transition-colors duration-300">
                <div className="flex items-center justify-between mb-8 md:mb-16 lg:mb-[10rem]">
                    <BlurText
                        text="(Testimonials)"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-[16px] md:text-[20px] lg:text-[22px] italic font-meta text-zinc-500 dark:text-zinc-400 transition-colors duration-300"
                    />
                    <BlurText
                        text="(03)"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-[16px] md:text-[20px] lg:text-[22px] italic font-meta text-zinc-500 dark:text-zinc-400 transition-colors duration-300"
                    />
                </div>
                <BlurText
                    text="WHAT PEOPLE SAY"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="!text-[3rem] md:!text-[6rem] lg:!text-[14rem] text-zinc-900 dark:text-zinc-100 font-bold leading-none font-heading transition-colors duration-300"
                />
                <BlurText
                    text="Real words from collaborators and clients I’ve worked with."
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-[1.25rem] md:text-[2.5rem] lg:text-[3.5rem] text-zinc-800 dark:text-zinc-200 font-semibold leading-none mt-3 md:mt-4 lg:mt-5 transition-colors duration-300"
                />
            </div>
            <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
                <div
                    ref={containerRef}
                    className="testimonial-marquee overflow-hidden"
                >
                    <div
                        ref={trackRef}
                        className="testimonial-track flex no-scrollbar"
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <div
                                key={`${testimonial.id}-${index}`}
                                className="basis-full md:basis-1/2 lg:basis-1/3 flex-shrink-0"
                            >
                                {renderCard(testimonial, index, `${testimonial.id}-${index}`)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
