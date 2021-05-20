import {useParams} from "react-router-dom"
import { gql, useQuery } from '@apollo/client';
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
    }
    suggestions(id: $id){
        id
        title
        medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  color: black;
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-top: 10px;
  color: white;
  font-size: 20px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Sg = styled.p`
margin-top: 20px;
color: white;
font-size: 28px;
`
;

const Sug = styled.div`
  display: flex;
  color: black;
  margin-left: 20px;
  margin-top: 10px;
`
;
const Sposter = styled.div`
width: 60px;
height: 60px;
background-color: transparent;
background-image: url(${props => props.bg});
background-size: cover;
background-position: center center;
`
;


export default () => {
  const { id } = useParams();
  const { loading, data, suggestions } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) }
  });
  console.log(data)
  return (
    <Container>
      <Column>
      <Title>{loading ? "Loading..." : data.movie.title}</Title>
        <Subtitle>
            Rating · {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
        <Sg>· Suggestions 💙</Sg>
        <Sug>{data?.suggestions?.map(s => s.title)}</Sug>
        <Sposter bg={data?.suggestions?.medium_cover_image}></Sposter>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
  );
};