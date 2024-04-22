/**
 * @desc The module containing the stripe related functionality
 * to handle the stripe payments
 * @author smartdata
 */
import Stripe from "stripe";
import fs from "fs";
import config from 'config';
const { STRIPE_PRIVATE_KEY, STRIPE_C_SUB, STRIPE_SP_SUB, STRIPE_TAX_ID, STRIPE_WEBHOOK_SECRET } = config.get('app');
const stripe = new Stripe(STRIPE_PRIVATE_KEY);


/**
 * create a unique stripe user. Will check from database
 * regarding the existance and will be called if key has not
 * been generated alreday for an existing user.
 * This will create the new user with credit card details.
 * Usually, this will be created for the student account
 * @param {String} email
 * @param {String} id
 * @param {String} card, to be provided for student profile
 * @param {String} bank, to be provided for teacher profile
 * either user email or id is required
 * either card or bank token of the user is required.
 */


export const CreateUser = async (email, id, card) => {
  const stripeCustomer = await stripe.customers.create({
    email: email,
    description: `Stipe details for ${email || id} customer`,
    source: card,
    metadata: {
      platformId: id
    }
  });
  return stripeCustomer;
};

export const getAllProducts = async () => {
  const products = await stripe.products.list();
  return products;
};

export const getAllSubscriptions = async () => {
  const products = await stripe.subscriptions.list({ limit: 100 });
  return products;
};

export const getAllPrices = async () => {
  const planPrices = await stripe.prices.list({ limit: 100 });
  return planPrices;
};

// export const getPrices = async () => {
//   const prices = await stripe.prices.list({ active: true });
//   return prices;
// };
/**
 * Create a session and return session id
 * @param {number} price
 * @param {String} success_url returned to when payment completes
 * @param {String} return_url returned to when payment not successful
 * 
 */
export const CreateCheckoutSession = async (data) => {

  let plan = data.plan.stripePriceId;
  if (!data.plan.monthly) {
    plan = data.plan.stripeYearlyPriceId;
  }
  const sessionParams = {
    success_url: data.success_url,
    cancel_url: data.cancel_url,
    payment_method_types: ['card'],
    mode: 'subscription',
    metadata: {
      planId: data.plan._id,
      userId: data.userId
    },
    locale: 'en',
    customer: data.customerId,
    subscription_data: {
      default_tax_rates: [
        STRIPE_TAX_ID,
      ],
      items: [
        { plan }
      ]
    }
  }
  if (data.coupon) {
    sessionParams.discounts = [{ coupon: 'FOUNDERS' }];
  }
  return stripe.checkout.sessions.create(sessionParams);
}

export const constructStripeEvent = async (request) => {
  const sig = request.headers['stripe-signature'];
  return stripe.webhooks.constructEvent(request.body, sig, STRIPE_WEBHOOK_SECRET);
}

export const CreatePortalSession = async (custId, return_url) => {
  return stripe.billingPortal.sessions.create({
    customer: custId,
    return_url
  });
}

export const retrieveGlobalCoupon = async (request) => {
  return stripe.coupons.retrieve('WELCOMETOPH');
}

export const retrieveSubscription = async (subscriptionId) => {
  return stripe.subscriptions.retrieve(subscriptionId);
}

export const retrievePrice = async (planId) => {
  return stripe.prices.retrieve(planId);
}


export const RetrieveUser = async (id) => {
  return await stripe.customers.retrieve(id);
};

//Create Card
export const CreateToken = async () => {
  return await stripe.tokens.create(
    {
      card: {
        number: '4242424242424242',
        exp_month: 6,
        exp_year: 2021,
        cvc: '314',
      },
    }
  );
};

/**
 * create a source for existing user.
 * regarding the existance and will be called if key has not
 * been generated alreday for an existing user.
 * This will create the new card with existing user.
 * @param {String} email
 * @param {String} id
 * @param {String} card, to be provided for student profile
 * @param {String} bank, to be provided for teacher profile
 * either user email or id is required
 * either card or bank token of the user is required.
 */
export const CreateSource = async ({ stripeId, source }) => {
  return await stripe.customers.createSource(stripeId, {
    source,
  });
};


export const createCharge = async (data) => {
  return await stripe.charges.create({
    amount: data.totalAmount * 100,
    currency: "cad",
    customer: data.customer,
    source: data.defaultSource,
    description: `payment for Buy Plan`,
  });
};

export const createPricePlan = async (data) => {
  console.log("createPricePlan ", data);
  return await stripe.prices.create({
    nickname: data.planName,
    product: data.stripeProductId,
    unit_amount: Math.floor(data.price * 100),
    currency: 'cad',
    recurring: {
      interval: 'month',
      usage_type: 'licensed',
    },
  });
};


export const couponCreate = async (data) => {
  return await await stripe.coupons.create({
    percent_off: data.percent_off,
    duration: 'once',
    max_redemptions: 1
  });
};


export const monthlyWithSubscription = async (data) => {
  const params = {
    customer: data.customer,
    items: [
      {
        price: data.stripePriceId,
        quantity: 1,
      },
    ],
    default_tax_rates: [
      STRIPE_TAX_ID,
    ]
  };
  if (data.coupon) {
    params.coupon = data.coupon;
  }
  return await stripe.subscriptions.create(
    params
  )
};

export const monthlyWitOutCouponSubscription = async (data) => {
  return await stripe.subscriptions.create({
    customer: data.customer,
    items: [
      {
        price: data.stripePriceId,
        quantity: 1,
      },
    ],
    default_tax_rates: [
      STRIPE_TAX_ID
    ],
  }
  )
};

export const getSubscriptionByID = async (data) => {
  console.log(data);
  return await stripe.subscriptions.retrieve(
    data.subscriptionIdId
  );
};

export const InvoicSubscription = async (data) => {
  return await await stripe.invoices.retrieve(
    data.invoiceId
  );
};

export const deleteSubscription = async (stripeSubscriptionId) => {
  console.log("                     ");
  console.log("deleteSubscription", JSON.stringify(stripeSubscriptionId))
  console.log("                     ");
  return await stripe.subscriptions.del(
    stripeSubscriptionId
  );
};








// export const monthlyCenterSubscription = async (data) => {
//   return await stripe.subscriptions.create({
//     customer: data.customer,
//     items: [
//       {
//         price: STRIPE_C_SUB,
//         quantity: 1,
//       },
//     ],
//   })
// };

// export const monthlySPSubscription = async (data) => {
//   return await stripe.subscriptions.create({
//     customer: data.customer,
//     items: [
//       {
//         price: STRIPE_SP_SUB,
//         quantity: 1,
//       },
//     ],
//   })
// };

