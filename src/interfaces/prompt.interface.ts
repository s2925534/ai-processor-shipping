// File Location: ./src/interfaces/prompt.interface.ts

export interface OpenAIPromptConfig {
    task: 'summarization' | 'categorization' | 'question_answering';
    inputText: string; // Input text for OpenAI processing
}

export interface OpenAIResponse {
    task: string;
    result: string; // Processed result from OpenAI
}
