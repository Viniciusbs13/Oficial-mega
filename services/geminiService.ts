
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

// Initialize chat session using strictly defined environment API key and recommended model
export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // Use process.env.API_KEY directly as required
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    // Updated to gemini-3-flash-preview for general text and simple Q&A tasks
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `Você é a ÔMEGA IA, a consultora virtual da Assessoria Ômega.

      REGRAS DE OURO (Siga estritamente):
      1. SEJA CURTA E DIRETA: Responda em no máximo 2 ou 3 frases curtas. O usuário quer rapidez. Evite "textões". Só dê detalhes técnicos se o usuário pedir explicitamente "me fale mais" ou "detalhe isso".
      2. SEM POLUIÇÃO VISUAL: NÃO use asteriscos (**), hashtags (#), ou formatação de Markdown. O chat não lê isso bem. Escreva texto limpo, como se fosse uma mensagem rápida de WhatsApp.
      3. FOCO NA AÇÃO: Seu único objetivo é tirar a dúvida básica e levar a pessoa para a "Pré-consultoria Gratuita".
      4. TOM DE VOZ: Profissional, ágil e humano.
      
      Roteiro ideal:
      - Responda a dúvida de forma sucinta.
      - Convide para a consultoria gratuita para avaliar o caso específico do cliente.

      Se perguntarem preço:
      Diga que é personalizado e que na pré-consultoria gratuita o time consegue passar o valor exato pro negócio dele.`,
    },
  });

  return chatSession;
};

// Send message to Gemini using the correctly initialized chat instance
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    // sendMessage handles the prompt via the message parameter
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Interrupção no sinal.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Não foi possível processar. Tente novamente.";
  }
};
