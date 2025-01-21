import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Flashcard, Deck, Offer, Review } from "../types";

class AccountService {
  api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_DEV_SERVER_URL || import.meta.env.VITE_SERVER_URL,
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers.set('Authorization', `Bearer ${storedToken}`);
      }

      return config;
    });
  }

  async getProfile() {
    const response: AxiosResponse = await this.api.get('/account/profile');
    return response.data;
  }

  async updateProfile(requestBody: FormData) {
    const response: AxiosResponse = await this.api.put('/account/profile', requestBody);
    return response.data;
  }

  async deleteProfile() {
    const response: AxiosResponse = await this.api.delete('/account/profile');
    return response.data;
  }

  async getClasses() {
    const response: AxiosResponse = await this.api.get('/account/classes');
    return response.data;
  }

  async cancelClass(classId: string) {
    const response: AxiosResponse = await this.api.delete(`/account/classes/${classId}`);
    return response.data;
  }

  async rescheduleClass(classId: string, requestBody: {date: string, timeslot: string}) {
    const response: AxiosResponse = await this.api.put(`/account/classes/${classId}/reschedule`, requestBody);
    return response.data;
  }

  async withdrawReschedule(classId: string) {
    const response: AxiosResponse = await this.api.put(`/account/classes/${classId}/reschedule/withdraw`);
    return response.data;
  }

  async acceptReschedule(classId: string) {
    const response: AxiosResponse = await this.api.put(`/account/classes/${classId}/reschedule/accept`);
    return response.data;
  }

  async declineReschedule(classId: string) {
    const response: AxiosResponse = await this.api.put(`/account/classes/${classId}/reschedule/decline`);
    return response.data;
  }

  async createReview(classId: string, requestBody: Pick<Review, "text" | "rating">) {
    const response: AxiosResponse = await this.api.post(`/account/reviews/${classId}`, requestBody);
    return response.data;
  }

  async getCalendar() {
    const response: AxiosResponse = await this.api.get('/account/calendar');
    return response.data;
  }

  async getOffers() {
    const response: AxiosResponse = await this.api.get('/account/offers');
    return response.data;
  }

  async createOffer(requestBody: Omit<Offer, '_id' | 'creator'>) {
    const response: AxiosResponse = await this.api.post('/account/offers', requestBody);
    return response.data;
  }

  async updateOffer(offerId: string, requestBody: Offer) {
    const response: AxiosResponse = await this.api.put(`/account/offers/${offerId}`, requestBody);
    return response.data;
  }

  async deleteOffer(offerId: string) {
    const response: AxiosResponse = await this.api.delete(`/account/offers/${offerId}`);
    return response.data;
  }

  async getDecks() {
    const response: AxiosResponse = await this.api.get('/account/decks');
    return response.data;
  }

  async createDeck(requestBody: Omit<Deck, '_id' | 'creator'>) {
    const response: AxiosResponse = await this.api.post('/account/decks', requestBody);
    return response.data;
  }

  async updateDeck(deckId: string, requestBody: Deck) {
    const response: AxiosResponse = await this.api.put(`/account/decks/${deckId}`, requestBody);
    return response.data;
  }

  async deleteDeck(deckId: string) {
    const response: AxiosResponse = await this.api.delete(`/account/decks/${deckId}`);
    return response.data;
  }

  async updateCards(deckId: string, requestBody: Flashcard[]) {
    const response: AxiosResponse = await this.api.put(`/account/decks/${deckId}/cards`, requestBody);
    return response.data;
  }

  async cloneDeck(deckId: string) {
    const response: AxiosResponse = await this.api.post(`/account/decks/${deckId}/clone`);
    return response.data;
  }

  async createFlashcard(deckId: string, requestBody: Pick<Flashcard, "front" | "back">) {
    const response: AxiosResponse = await this.api.post(`/account/flashcards/${deckId}`, requestBody);
    return response.data;
  }

  async updateFlashcard(cardId: string, requestBody: Flashcard) {
    const response: AxiosResponse = await this.api.put(`/account/flashcards/${cardId}`, requestBody);
    return response.data;
  }

  async deleteFlashcard(cardId: string) {
    const response: AxiosResponse = await this.api.delete(`/account/flashcards/${cardId}`);
    return response.data;
  }

  async getReviews() {
    const response: AxiosResponse = await this.api.get('/account/reviews');
    return response.data;
  }

  async getEarnings() {
    const response: AxiosResponse = await this.api.get('/account/earnings');
    return response.data;
  }
}

// Create one instance (object) of the service
const accountService = new AccountService();

export default accountService;