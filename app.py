from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import youtube_dl

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/download', methods=['POST'])
def download_media():
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({'success': False, 'message': 'URL is required.'}), 400

    try:
        # Set download options
        ydl_opts = {
            'format': 'best',
            'outtmpl': 'downloads/%(title)s.%(ext)s',
            'noplaylist': True,
        }

        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(url, download=False)
            ydl.download([url])

            file_name = ydl.prepare_filename(info_dict)
            file_url = f"http://your-hosted-url.com/{file_name}"

        return jsonify({'success': True, 'file_url': file_url})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    if not os.path.exists('downloads'):
        os.makedirs('downloads')  # Create a directory for downloads
    app.run(debug=True, port=5000)