'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import RatingStars from './RatingStars';

interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  productSlug: string;
  productName: string;
}

const STORAGE_PREFIX = 'meilleur-ats-reviews-';

export default function ReviewSection({ productSlug, productName }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const initialized = useRef(false);

  // Form state
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState('');

  // Load reviews from localStorage
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}${productSlug}`);
      if (stored) setReviews(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, [productSlug]);

  const saveReview = useCallback(
    (newReviews: Review[]) => {
      setReviews(newReviews);
      localStorage.setItem(`${STORAGE_PREFIX}${productSlug}`, JSON.stringify(newReviews));
    },
    [productSlug]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      author: author.trim(),
      role: role.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
    };

    saveReview([newReview, ...reviews]);
    setAuthor('');
    setRole('');
    setRating(4);
    setComment('');
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <section className="print:hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Avis utilisateurs
          {reviews.length > 0 && (
            <span className="ml-2 text-base font-normal text-gray-500">
              ({reviews.length} avis)
            </span>
          )}
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
        >
          {showForm ? 'Annuler' : 'Laisser un avis'}
        </button>
      </div>

      {reviews.length > 0 && (
        <div className="mt-3 flex items-center gap-3">
          <RatingStars rating={averageRating} size="md" />
          <span className="text-sm text-gray-500">
            Note moyenne : {averageRating.toFixed(1)}/5
          </span>
        </div>
      )}

      {/* Success message */}
      {submitted && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700" role="status">
          Merci pour votre avis sur {productName} !
        </div>
      )}

      {/* Review form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <h3 className="font-semibold text-gray-900">
            Votre avis sur {productName}
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="review-author" className="block text-sm font-medium text-gray-700">
                Votre nom *
              </label>
              <input
                id="review-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Jean Dupont"
              />
            </div>
            <div>
              <label htmlFor="review-role" className="block text-sm font-medium text-gray-700">
                Votre fonction
              </label>
              <input
                id="review-role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="DRH, Recruteur freelance..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Note *</label>
            <div className="mt-1 flex gap-1" role="radiogroup" aria-label="Note sur 5">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  role="radio"
                  aria-checked={rating === value}
                  aria-label={`${value} étoile${value > 1 ? 's' : ''}`}
                  className="transition"
                >
                  <svg
                    className={`h-8 w-8 ${value <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700">
              Votre avis *
            </label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Partagez votre expérience avec ce logiciel..."
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
          >
            Publier mon avis
          </button>
        </form>
      )}

      {/* Reviews list */}
      {reviews.length > 0 ? (
        <div className="mt-6 space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{review.author}</p>
                  {review.role && (
                    <p className="text-sm text-gray-500">{review.role}</p>
                  )}
                </div>
                <time className="text-xs text-gray-400" dateTime={review.date}>
                  {new Date(review.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="mt-2">
                <RatingStars rating={review.rating} size="sm" showValue={false} />
              </div>
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        !showForm && (
          <p className="mt-4 text-sm text-gray-500">
            Aucun avis pour le moment. Soyez le premier à donner votre avis sur {productName} !
          </p>
        )
      )}
    </section>
  );
}
