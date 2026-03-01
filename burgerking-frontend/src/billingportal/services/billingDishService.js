export const fetchDishes = async () => {
  const res = await fetch("http://localhost:8080/api/billing/dishes");
  return res.json();
};
