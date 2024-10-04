import React, { useState, useEffect } from 'react';

export default function TrendingTopics() {
    const [posts, setPosts] = useState([]);
    const [topics, setTopics] = useState([]);

    // Função para buscar posts
    const getPosts = async () => {
        try {
            const response = await fetch("http://localhost:3001/Posts", {
                method: "POST",
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

    // Função para contar as hashtags mais frequentes (sem duplicação por post)
    const getTrendingTopics = (posts) => {
        const countWords = {};

        posts.forEach((post) => {
            const words = post.text.split(/\s+/); // Divide o texto em palavras
            const hashtagsUnicas = new Set(); // Set para garantir contagem única de hashtags por post

            words.forEach((word) => {
                if (word.startsWith('#')) {
                    const lowerCaseWord = word.toLowerCase(); // Converte para minúsculas
                    hashtagsUnicas.add(lowerCaseWord); // Adiciona ao Set (elimina duplicatas no mesmo post)
                }
            });

            // Conta as hashtags únicas encontradas neste post
            hashtagsUnicas.forEach((hashtag) => {
                countWords[hashtag] = (countWords[hashtag] || 0) + 1;
            });
        });

        // Ordena as hashtags por frequência e limita a 10 tópicos
        const orderedWords = Object.entries(countWords)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        setTopics(orderedWords);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPosts(); // Espera a resposta de getPosts
            setPosts(data);
            getTrendingTopics(data); // Passa os posts para contar as hashtags
        };

        fetchData(); // Chama a função
    }, []);

    return (
        <div className="w-full h-full p-4 bg-neutral-gray rounded-2xl">
            <h2 className="mb-4 text-xl font-bold">Trending Topics</h2>
            {topics.length > 0 ? (
                topics.map(([word, count], index) => (
                    <Topic key={index} word={word} count={count} />
                ))
            ) : (
                <p>Carregando tópicos...</p>
            )}
        </div>
    );
}

export function Topic({ word, count }) {
    return (
        <div className="flex justify-between mb-2">
            <span>{word}</span>
            <span className="text-gray-500">{count} mentions</span>
        </div>
    );
}
