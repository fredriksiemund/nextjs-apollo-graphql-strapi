import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { API_URL } from "../../lib/apollo";

const QUERY = gql`
  {
    restaurants {
      data {
        id
        attributes {
          name
          description
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
`;
const RestaurantList = (props) => {
  const { loading, error, data } = useQuery(QUERY);
  console.log(process.env.NEXT_PUBLIC_API_URL);

  if (error)
    return (
      <div>
        <h1>Oops, something went wrong...</h1>
        <p>{error.message}</p>
      </div>
    );

  if (loading) return <h1>Loading...</h1>;

  if (data.restaurants?.data?.length) {
    const searchQuery = data.restaurants.data.filter((query) =>
      query.attributes.name.toLowerCase().includes(props.search)
    );

    if (searchQuery.length > 0) {
      return (
        <Row>
          {searchQuery.map(({ id, attributes }) => (
            <Col xs="6" sm="4" key={id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${API_URL}${attributes.image.data[0].attributes.url}`}
                />
                <CardBody>
                  <CardTitle>{attributes.name}</CardTitle>
                  <CardText>{attributes.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/restaurants/${id}`}
                    href={`/restaurants?id=${id}`}
                  >
                    <a className="btn btn-primary">View</a>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </Row>
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }
  return <h5>Add Restaurants</h5>;
};

export default RestaurantList;
