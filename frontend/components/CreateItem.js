import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $price: Int!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createItem(title: $title, price: $price, description: $description, image: $image, largeImage: $largeImage) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: 'Cool shoes',
    description: 'I love these shoes',
    image: 'dog.jpg',
    largeImage: 'large-dog.jpg',
    price: 20,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickFits');

    const res = await fetch('https://api.cloudinary.com/v1_1/dwsfmmg8c/image/upload', { method: 'POST', body: data });
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file && file.eager && file.eager[0] && file.eager[0].secure_url,
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await createItem();
              // take the user to the single item page
              Router.push({
                pathname: '/item',
                query: {
                  id: res.data.createItem.id,
                },
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                File
                <input type="file" id="file" name="file" placeholder="File" onChange={this.uploadFile} />
                {this.state.image && <img width="200" src={this.state.image} alt="Upload preview" />}
              </label>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  onChange={this.handleChange}
                  value={this.state.title}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="Price"
                  name="price"
                  placeholder="Price"
                  required
                  onChange={this.handleChange}
                  value={this.state.price}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="enter a description"
                  required
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
