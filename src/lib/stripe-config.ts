
export const stripePublishableKey = "pk_test_your_publishable_key_here"; // Replace with your actual Stripe publishable key

export function formatPrice(amount: number, currency: string = "EUR"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
