from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the pre-trained model and data
model = pickle.load(open('Data/model.pkl', 'rb'))
book_names = pickle.load(open('Data/book_names.pkl', 'rb'))
final_rating = pickle.load(open('Data/final_rating.pkl', 'rb'))
book_pivot = pickle.load(open('Data/book_pivot.pkl', 'rb'))

def fetch_poster(suggestion):
    # Implementation of fetch_poster function...
    book_name = []
    ids_index = []
    poster_url = []

    for book_id in suggestion:
        book_name.append(book_pivot.index[book_id])

    for name in book_name[0]: 
        ids = np.where(final_rating['title'] == name)[0][0]
        ids_index.append(ids)

    for idx in ids_index:
        url = final_rating.iloc[idx]['image_url']
        poster_url.append(url)

    return poster_url


def recommend_book(book_name):
    # Implementation of recommend_book function...
    books_list = []
    book_id = np.where(book_pivot.index == book_name)[0][0]
    distance, suggestion = model.kneighbors(book_pivot.iloc[book_id,:].values.reshape(1,-1), n_neighbors=6 )

    poster_url = fetch_poster(suggestion)
    
    for i in range(len(suggestion)):
            books = book_pivot.index[suggestion[i]]
            for j in books:
                books_list.append(j)
    return books_list , poster_url 

@app.route('/')
def home():
    return render_template('Website.html', book_names=book_names)

@app.route('/Action.html')
def Action():
    return render_template('Action.html')

@app.route('/Adventure.html')
def Adventure():
    return render_template('Adventure.html', book_names=book_names)

@app.route('/Categories.html')
def Categories():
    return render_template('Categories.html')

@app.route('/Comic.html')
def Comic():
    return render_template('Comic.html', book_names=book_names)

@app.route('/Contact.html')
def Contact():
    return render_template('Contact.html', book_names=book_names)

@app.route('/Dashboard.html')
def Dashboard():
    return render_template('Dashboard.html', book_names=book_names)

@app.route('/Fantasy.html')
def Fantasy():
    return render_template('Fantasy.html', book_names=book_names)

@app.route('/Horror.html')
def Horror():
    return render_template('Horror.html', book_names=book_names)

@app.route('/MyAds.html')
def MyAds():
    return render_template('MyAds.html', book_names=book_names)

@app.route('/Mystery.html')
def Mystery():
    return render_template('Mystery.html', book_names=book_names)

@app.route('/Other.html')
def Other():
    return render_template('Other.html', book_names=book_names)

@app.route('/Registration.html')
def Registration():
    return render_template('Registration.html', book_names=book_names)

@app.route('/Signin.html')
def Signin():
    return render_template('Signin.html', book_names=book_names)

@app.route('/test6.html')
def test6():
    return render_template('test6.html', book_names=book_names)

@app.route('/test7.html')
def test7():
    return render_template('test7.html', book_names=book_names)


@app.route('/DisplayRecommendation.html')
def DisplayRecommendation():
    return render_template('DisplayRecommendation.html', book_names=book_names)
    

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    selected_book = request.json['selected_book']
    books_list, poster_url = recommend_book(selected_book)
    return jsonify({'books_list': books_list, 'poster_url': poster_url})

if __name__ == '__main__':
    app.run(debug=True)
