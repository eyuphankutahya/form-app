<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="message"
        type="text"
        @keyup.enter="handleSubmit"
        placeholder="Mesajınızı yazın"
      />
      <button type="submit">Gönder</button>
    </form>

    <div v-for="response in responses" :key="response.id">
      <p>{{ response.message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref } from 'vue';

// Yanıtlarınız için daha uygun bir Response interface'i tanımlıyorum
interface Response {
  id: number; // Her yanıt için benzersiz bir ID ekliyorum
  message: string;
}

export default defineComponent({
  name: 'ChatForm',
  setup() {
    const message = ref<string>(''); // Mesaj için string tipli ref tanımlandı
    const responses = ref<Response[]>([]); // Yanıtlar için Response tipinde bir array ref tanımlandı

    const handleSubmit = async () => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            prompt: message.value,
          },
        );
        const newMessage = {
          id: responses.value.length + 1, // Yeni mesaj için benzersiz bir ID oluşturuluyor
          message: response.data.choices[0].message, // API'den gelen mesaj alınıyor
        };
        responses.value.push(newMessage); // Yeni mesaj yanıtlar listesine ekleniyor
        message.value = ''; // Mesaj kutusu temizleniyor
      } catch (error) {
        console.error('Mesaj gönderilirken bir hata oluştu:', error);
      }
    };

    return { message, responses, handleSubmit };
  },
});
</script>

<style scoped>
/* İsteğe bağlı stil tanımları buraya eklenebilir */
</style>
