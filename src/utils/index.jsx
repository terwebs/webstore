import axios from "axios";
import { useEffect, useState } from "react";

const accessToken = import.meta.env.VITE_API_KEY;
// const productsURL = `https://cdn.contentful.com/spaces/6n3ggdxvlwai/environments/master/entries?access_token=${accessToken}`;
const productionUrl = `https://cdn.contentful.com/spaces/6n3ggdxvlwai/environments/master`;

export const customFetch = axios.create({
  baseURL: productionUrl,
  params: {
    access_token: accessToken,
    limit: 9,
  },
});

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};

// This generates an array of length 10 and starts index at 0 +1
export const generateOptions = () => {
  return Array.from({ length: 10 }, (_, index) => {
    const quantity = index + 1;
    return (
      <option key={quantity} value={quantity}>
        {quantity}
      </option>
    );
  });
};

export const getContenfulFilters = (products) => {
  const uniqueCategories = new Set();
  const uniqueCompanies = new Set();

  products.forEach((item) => {
    if (item.fields.category) {
      uniqueCategories.add(item.fields.category);
    }
    if (item.fields.company) {
      uniqueCompanies.add(item.fields.company);
    }
  });

  const categories = [...uniqueCategories];
  const companies = [...uniqueCompanies];

  return { categories, companies };
};
