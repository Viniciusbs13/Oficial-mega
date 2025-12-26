
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
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

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Sistema offline. (API Key ausente)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Interrupção no sinal.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Não foi possível processar. Tente novamente.";
  }
};
