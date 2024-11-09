import React, { useState } from 'react';
import StarRating from './StarRatingProps.tsx';
import "../../Styles/FeedbackWidget.css";
import { Send, SendHorizonal } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rating, comment });
    onClose();
    setRating(0);
    setComment('');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title fs-4 " id='textAvis'>Partagez-nous votre avis ?</h5> 
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div id="SeparT"></div>

            <div className="modal-body px-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label" id='LabelText'>Comment trouvez-vous ce travail ?</label>
                  <StarRating
                    rating={rating}
                    hoveredRating={hoveredRating}
                    onRate={setRating}
                    onHover={setHoveredRating}
                    onLeave={() => setHoveredRating(0)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="comment" className="form-label" id='CommentText'>
                    Commentaire
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-control"
                    rows={4}
                    placeholder="Partagez votre expérience..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  id='downloadPDF'
                >
                  Envoyer <SendHorizonal />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackModal;