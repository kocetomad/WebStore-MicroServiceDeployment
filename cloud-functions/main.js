//This Cloud function validates item before they get sent to the main DB

const functions = require('@google-cloud/functions-framework');

const escapeHtml = require('escape-html');
const fetch = require('node-fetch');


/**
 * Responds to an HTTP request using data from the request body parsed according
 * to the "content-type" header.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.backup = (req, res) => {
  let name;
  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  const { id, item_name, item_description, item_tags, item_price, item_featured } = req.body;

  let body = {
      id: id,
      item_name: item_name,
      item_description: item_description,
      item_tags: item_tags,
      item_price: item_price,
      item_featured: item_featured,
    };
  switch (req.get('content-type')) {
    // '{"name":"John"}'
    case 'application/json':
      ({name} = req.body);
      break;

    // 'John', stored in a Buffer
    case 'application/octet-stream':
      name = req.body.toString(); // Convert buffer to a string
      break;

    // 'John'
    case 'text/plain':
      name = req.body;
      break;

    // 'name=John' in the body of a POST request (not the URL)
    case 'application/x-www-form-urlencoded':
      ({name} = req.body);
      break;
  }

  (async function () {
  const response = await fetch(
    "https://cmuvgvtjeycdnzjdufpa.supabase.co/",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body),
    }
  );
})()

  res.status(200).send(`Hello ${escapeHtml(name || 'World')}!`);
};