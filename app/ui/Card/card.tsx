import React from "react";

interface Card {
    content: React.ReactNode;
    height: string;
    width: string;
    color: string;
}

export default function Card({ content, height, width, color }: Card) {
    return (
        <article className={`rounded-md shadow-inner flex flex-col justify-center items-start ${height} ${width} ${color} overflow-hidden`}>
            {content}
        </article>
    );
}
