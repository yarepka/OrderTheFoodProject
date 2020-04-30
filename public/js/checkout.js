// validating credit card data fetched from the form

// we need to set "publishable key" which is required
// because, when stripe validates the credit card
// data it will give us back a token if the
// data is valid. This token will hold credit
// card data and it will be encrypted with our
// "publishable key" with that key we will later
// be able to decrypt the credit card information
// and make the actual charge
// 1st Validation
// 2nd Charging
// for more: https://www.youtube.com/watch?v=3meH2TK4KuI&list=PL55RiY5tL51rajp7Xr_zk-fCFtzdlGKUp&index=16

// Secret Key will be needed for decrypting credit card info
Stripe.setPublishableKey("pk_test_Gb0qF4W8AhEbA1L2cp2ohoPl00v0zXCHCn");

// https://stripe.com/docs/stripe-js/v2 old docs

var $form = $("#checkout-form");

$form.submit((event) => {
  $("#charge-error").addClass("hidden");
  // disabling the button after it getting clicked
  // we do that so the user can't submit the form
  // multiple time while validation is going on.
  $form.find("button").prop("disabled", true);

  // stripeResponseHandler will be called after
  // card validation will be done
  Stripe.card.createToken(
    {
      // all this ids set up in checkout.hbs
      number: $("#card-number").val(),
      cvc: $("#card-cvc").val(),
      exp_month: $("#card-expiry-month").val(),
      exp_year: $("#card-expiry-year").val(),
      name: $("#card-name").val(),
    },
    stripeResponseHandler
  );

  return false;
});

function stripeResponseHandler(status, response) {
  if (response.error) {
    // Problem!

    // Show the errors on the form
    $("#charge-error").text(response.error.message);
    $("#charge-error").removeClass("hidden");
    $form.find("button").prop("disabled", false); // Re-enable submission
  } else {
    // Token was created!

    // Get the token ID:
    // We will be able to decrypt it using publishable key
    var token = response.id;

    // Insert the token into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));

    // Submit the form:
    $form.get(0).submit();
  }
}
