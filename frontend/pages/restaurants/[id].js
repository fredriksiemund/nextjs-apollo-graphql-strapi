import { gql, useQuery } from "@apollo/client";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { API_URL } from "../../lib/apollo";
import client from "../../lib/apollo";

const QUERY = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      data {
        id
        attributes {
          name
          description
          dishes {
            data {
              id
              attributes {
                name
                description
                price
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: QUERY,
    variables: { id: params.id },
  });

  return {
    props: {
      restaurant: data.restaurant.data.attributes,
    },
  };
}

// This page uses server side pre-rendering
function Restaurant({ restaurant }) {
  return (
    <>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <Row>
        {restaurant.dishes.data.map(({ id, attributes }) => (
          <Col xs="6" sm="4" style={{ padding: 0 }} key={id}>
            <Card style={{ margin: "0 10px" }}>
              <CardImg
                top={true}
                style={{ height: 250 }}
                src={`${API_URL}${attributes.image.data.attributes.url}`}
              />
              <CardBody>
                <CardTitle>{attributes.name}</CardTitle>
                <CardText>{attributes.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button outline color="primary">
                  + Add To Cart
                </Button>

                <style jsx>
                  {`
                    a {
                      color: white;
                    }
                    a:link {
                      text-decoration: none;
                      color: white;
                    }
                    .container-fluid {
                      margin-bottom: 30px;
                    }
                    .btn-outline-primary {
                      color: #007bff !important;
                    }
                    a:hover {
                      color: white !important;
                    }
                  `}
                </style>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Restaurant;
