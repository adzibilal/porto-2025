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
            <div className="bg-white px-[6rem] pt-[8rem] pb-[5rem]">
                <div className="flex items-center justify-between mb-[10rem]">
                    <BlurText
                        text="(Testimonials)"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-[22px] italic font-meta text-zinc-500"
                    />
                    <BlurText
                        text="(03)"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-[22px] italic font-meta text-zinc-500"
                    />
                </div>
                <BlurText
                    text="WHAT THEY SAY"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="!text-[14rem] text-zinc-900 font-bold leading-none font-heading"
                />
                <BlurText
                    text="Hear from my colleagues and clients about my work and what they think of me."
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-[3.5rem] text-zinc-800 font-semibold leading-none mt-5"
                />
            </div>
            <div className="grid grid-cols-3 bg-white">
                {dummyTestimonials.map((testimonial, idx) => (
                    <div key={testimonial.id} className={`${idx % 2 === 0 ? 'bg-zinc-50' : 'bg-zinc-100'} p-[4rem] flex flex-col justify-between`}>
                        <Image src={quoteIcon} alt="quote" width={50} height={50} className='mb-[2rem]' />
                        <div className="">
                            <div className="text-xl text-zinc-900 font-semibold">{testimonial.title}</div>
                            <div className="text-md text-zinc-500 mt-[1rem]">{testimonial.description}</div>
                        </div>
                        <div className="flex items-center gap-2 mt-[2rem]">
                            <div className="w-10 h-10 bg-zinc-900 rounded-full"></div>
                            <div className="">
                                <div className="text-xl text-zinc-900 font-semibold">{testimonial.name}</div>
                                <div className="font-meta text-zinc-500 italic text-sm">{testimonial.jobTitle}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialSection;
