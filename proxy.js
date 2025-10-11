export default {
  async fetch(request) {
    try {
      // Recebe o formData enviado pelo Render
      const formData = await request.formData();

      // URL do ImgBB com sua API Key
      const apiKey = 'cbd6b03d5139605300797185cad2b213';
      const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

      // Repassa a requisição para o ImgBB
      const response = await fetch(url, {
        method: "POST",
        body: formData
      });

      // Retorna a resposta do ImgBB para o Render
      return new Response(response.body, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  }
};