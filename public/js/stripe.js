import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51PCOoB046HH4OO9Y2iHhV7A3pH18Ua0Jg33N09Gjo39Mv4uKA9TynCRdo6fWsyrOuyJwrb70otlG0uqpXOLzduMI009eBKSwwn',
);

export const bookTour = async tourId => {
  try {
    // 1) get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );

    // 2) Create checkout form + charge creidt card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
