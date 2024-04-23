import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkout";
import "./style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useMainContext } from "../../../context/MainContext";
import { useFetchDocuments } from "../../../hooks/useFetchDocuments";

const stripePromise = loadStripe("pk_live_51Obph4JGY6R57eKc9biyRIwp41c1TAD8PNGLNXkqXUf6GoTBLc2duDf7pl4EohCcAdLMlrQZ1o5GKa8zlxoiBnZ600BtxjxfKU");

const CardPayment = ({value, setDocument, handleClick, archivesURL, name}) => {
  const {id} = useParams()
  const [state] = useMainContext()
  const [id_payment, setId_payment] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const {documents: last_order} = useFetchDocuments("archives", null, null, false, true)
  const [status, setStatus] = useState()


  const getData = async () => {

    const response = await axios.post("/.netlify/functions/userCredential", {
      value: value
    })


    return response.data

  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (clientSecret) {
      return
    }
    if (id) {
      setClientSecret(id)
    } else {
      getData().then(res =>{
        setClientSecret(res.clientSecret)
        setId_payment(res.id_payment)
        setStatus(res.status)
      })
    }
  
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    if (!last_order || id) {
      return
    }

    if (!id) {
      const cartWithPaymentInfos = {
        ...state.cart,
        paymentInfos: {id_payment, clientSecret, status},
        numOrder: last_order[0]?.numOrder ? last_order[0].numOrder + 1 : 2963,
        finalized: false,
        uid: state?.user?.uid,
        user: {...state.user, displayName: name || state.user.displayName}
      }
      setDocument(cartWithPaymentInfos)
    }


  },[state.cart, id_payment, clientSecret, status, last_order, name])

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} archivesURL={archivesURL} handleClick={handleClick} />
        </Elements>
      )}
    </div>
  );
}

export default CardPayment