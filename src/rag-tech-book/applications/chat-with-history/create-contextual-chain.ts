import { ChatOpenAI } from '@langchain/openai';
import { contextualizeQPrompt } from '../constants/prompts.constant';
import { StringOutputParser } from '@langchain/core/output_parsers';

export function createContextualQuestion(llm: ChatOpenAI) {
  const contextualizeQChain = contextualizeQPrompt
    .pipe(llm)
    .pipe(new StringOutputParser());

  return (input: Record<string, number>) => {
    if ('chat_history' in input) {
      return contextualizeQChain;
    }
    return input.question;
  };
}
