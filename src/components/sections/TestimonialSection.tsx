"use client";

import React from 'react';
import Image from 'next/image';
import BlurText from '@/components/shared/BlurText';
import quoteIcon from '@/assets/icons/quote-icon.svg';

const TestimonialSection = () => {
    const handleAnimationComplete = () => {
        console.log('Testimonial animation completed!');
    };

    const dummyTestimonials = [
        {
            id: 1,
            title: 'A pleasure working with Adzi',
            description: 'It has been a pleasure working with Adzi, a front-end developer who consistently demonstrates a strong commitment to continuous learning and professional growth.',
            name: 'Nur Sasongko',
            imageUrl: '/images/projects/project-1.jpg',
            jobTitle: 'Full Stack Web Dev @ Motiolabs',
        },
        {
            id: 2,
            title: 'Exceptional Branding That Elevated Our Identity.',
            description: 'His ability to understand our vision and translate it into a compelling brand identity was nothing short of remarkable. He took the time to deeply understand our business and our target audience, ensuring that every detail of our brand reflected our values and resonated with our customers.',
            name: 'John Doe',
            imageUrl: '/images/projects/project-1.jpg',
            jobTitle: 'CEO at Google',
        },
        {
            id: 3,
            title: 'Exceptional Branding That Elevated Our Identity.',
            description: 'His ability to understand our vision and translate it into a compelling brand identity was nothing short of remarkable. He took the time to deeply understand our business and our target audience, ensuring that every detail of our brand reflected our values and resonated with our customers.',
            name: 'John Doe',
            imageUrl: '/images/projects/project-1.jpg',
            jobTitle: 'CEO at Google',
        },
        {
            id: 4,
            title: 'Exceptional Branding That Elevated Our Identity.',
            description: 'His ability to understand our vision and translate it into a compelling brand identity was nothing short of remarkable. He took the time to deeply understand our business and our target audience, ensuring that every detail of our brand reflected our values and resonated with our customers.',
            name: 'John Doe',
            imageUrl: '/images/projects/project-1.jpg',
            jobTitle: 'CEO at Google',
        },
        {
            id: 5,
            title: 'Exceptional Branding That Elevated Our Identity.',
            description: 'His ability to understand our vision and translate it into a compelling brand identity was nothing short of remarkable. He took the time to deeply understand our business and our target audience, ensuring that every detail of our brand reflected our values and resonated with our customers.',
            name: 'John Doe',
            imageUrl: '/images/projects/project-1.jpg',
            jobTitle: 'CEO at Google',
        },
        {
            id: 6,
            title: 'Exceptional Branding That Elevated Our Identity.',
            description: 'His ability to understand our vision and translate it into a compelling brand identity was nothing short of remarkable. He took the time to deeply understand our business and our target audience, ensuring that every detail of our brand reflected our values and resonated with our customers.',
            name: 'John Doe',
            imageUrl: '/images/projects/project-1.jpg',
            jobTitle: 'CEO at Google',
        },
    ];

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
                    text="WHAT THEY SAY"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="!text-[3rem] md:!text-[6rem] lg:!text-[14rem] text-zinc-900 dark:text-zinc-100 font-bold leading-none font-heading transition-colors duration-300"
                />
                <BlurText
                    text="Hear from my colleagues and clients about my work and what they think of me."
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-[1.25rem] md:text-[2.5rem] lg:text-[3.5rem] text-zinc-800 dark:text-zinc-200 font-semibold leading-none mt-3 md:mt-4 lg:mt-5 transition-colors duration-300"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white dark:bg-gray-900 transition-colors duration-300">
                {dummyTestimonials.map((testimonial, idx) => (
                    <div key={testimonial.id} className={`${idx % 2 === 0 ? 'bg-zinc-50 dark:bg-gray-800' : 'bg-zinc-100 dark:bg-gray-700'} p-6 md:p-8 lg:p-[4rem] flex flex-col justify-between min-h-[400px] md:min-h-[450px] lg:min-h-[500px] transition-colors duration-300`}>
                        <Image src={quoteIcon} alt="quote" width={40} height={40} className='mb-4 md:mb-6 lg:mb-[2rem]' />
                        <div className="">
                            <div className="text-lg md:text-xl text-zinc-900 dark:text-zinc-100 font-semibold transition-colors duration-300">{testimonial.title}</div>
                            <div className="text-sm md:text-md text-zinc-500 dark:text-zinc-400 mt-3 md:mt-4 lg:mt-[1rem] leading-relaxed transition-colors duration-300">{testimonial.description}</div>
                        </div>
                        <div className="flex items-center gap-3 mt-6 md:mt-8 lg:mt-[2rem]">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-900 dark:bg-zinc-600 rounded-full transition-colors duration-300"></div>
                            <div className="">
                                <div className="text-lg md:text-xl text-zinc-900 dark:text-zinc-100 font-semibold transition-colors duration-300">{testimonial.name}</div>
                                <div className="font-meta text-zinc-500 dark:text-zinc-400 italic text-xs md:text-sm transition-colors duration-300">{testimonial.jobTitle}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialSection;
