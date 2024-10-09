import React, { useState, useEffect } from 'react';
import { MediumText, Text } from '../texts';
import Link from 'next/link';

export default function TrendingTopics() {
    const [posts, setPosts] = useState([]);
    const [topics, setTopics] = useState([]);

    const getPosts = async () => {
        try {
            const response = await fetch("http://localhost:3001/Posts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };


    const getTrendingTopics = (posts) => {
        const countWords = {};

        posts.forEach((post) => {

            if (post.text) {

                const words = post.text.match(/#\w+/g);


                if (!words) return;

                const hashtagsUnicas = new Set();

                words.forEach((word) => {
                    const lowerCaseWord = word.toLowerCase();
                    hashtagsUnicas.add(lowerCaseWord);
                });

                hashtagsUnicas.forEach((hashtag) => {
                    countWords[hashtag] = (countWords[hashtag] || 0) + 1;
                });
            }
        });


        const orderedWords = Object.entries(countWords)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        setTopics(orderedWords);
    };



    useEffect(() => {
        const fetchData = async () => {
            const data = await getPosts();
            setPosts(data);
            getTrendingTopics(data);
        };

        fetchData();
    }, []);

    return (
        <div className="w-full h-full p-6">
            <Text className="mb-4 text-xl font-bold">Em alta</Text>
            {
                topics.map(([word, count], index) => (
                    <Topic key={index} word={word} count={count} />
                ))
            }
        </div>
    );
}

export function Topic({ word, count }) {
    const query = word.startsWith("#") ? word.substring(1, word.length) : word
    return (
        <Link href={`search/${query}`} className="flex flex-col justify-between p-6 my-4 mb-2 bg-neutral-gray rounded-2xl">
            <Text style={""}>{word}</Text>
            <MediumText style={"opacity-50"} className="text-gray-500">{count} posts</MediumText>
        </Link>
    );
}
