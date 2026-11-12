import { contacts } from "@/content/site";

/**
 * Ссылка wa.me открывает чат и на смартфоне (приложение), и на компьютере
 * (WhatsApp Desktop или web.whatsapp.com). Текст кодируется через encodeURIComponent.
 */
export function whatsappUrl(message: string = contacts.whatsappMessage): string {
  return `https://wa.me/${contacts.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_ORDER_URL = whatsappUrl();
export const WHATSAPP_PLAIN_URL = `https://wa.me/${contacts.whatsappNumber}`;
