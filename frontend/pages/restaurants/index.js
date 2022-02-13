import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
  Input,
  InputGroup,
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

// This page uses Client-side rendering
const Restaurants = () => {
  const { loading, error, data } = useQuery(QUERY);
  const [searchString, setSearchString] = useState("");

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
      query.attributes.name.toLowerCase().includes(searchString)
    );

    if (searchQuery.length > 0) {
      return (
        <>
          <Row>
            <Col>
              <div className="search">
                <InputGroup>
                  <Input
                    placeholder="Search..."
                    onChange={(e) =>
                      setSearchString(e.target.value.toLocaleLowerCase())
                    }
                    value={searchString}
                  />
                </InputGroup>
              </div>
            </Col>
          </Row>
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
                    <Link href={`/restaurants/${id}`}>
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
                .search {
                  margin: 20px 0 20px 0;
                  width: 500px;
                }
              `}
            </style>
          </Row>
        </>
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }
  return <h5>Add Restaurants</h5>;
};

export default Restaurants;
