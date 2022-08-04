import React from "react";
import { useStoreState } from "easy-peasy";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import ProgramList from "./ProgramList";
import configData from "../config.json";

const Person = () => {
  const program = useStoreState((state) => state.program);
  const people = useStoreState((state) => state.people);
  const params = useParams();
  const person = people.find((person) => person.id.toString() === params.id);
  if (!person)
    return (
      <div className="error">
        Person id <span>{params.id}</span> was not found.
      </div>
    );
  const img = person.img ? <img src={person.img} alt={person.name} /> : "";
  // Sanitize the bio to remove dangerous HTML, using options from config.
  const safeBio = person.bio
    ? DOMPurify.sanitize(person.bio, configData.PEOPLE.BIO.PURIFY_OPTIONS)
    : "";
  const filteredProgram = program.filter((item) => {
    if (item.people) {
      // IF item has people, check eash one to see if they match the person we're interested in.
      for (const person of item.people) {
        if (person.id.toString() === params.id) return true;
      }
    }
    return false;
  });
  const personlinkstwitter = person.links.twitter ? <a href={person.links.twitter}>{person.links.twitter}</a> : "";
  const personlinksfacebook = person.links.facebook ? <a href={person.links.facebook}>{person.links.facebook}</a> : "";
  const personlinkswebsite = person.links.website ? <a href={person.links.website}>{person.links.website}</a> : "";
  const personlinksinstagram = person.links.instagram ? <a href={person.links.instagram}>{person.links.instagram}</a> : "";
  const personlinkstwitch = person.links.twitch ? <a href={person.links.twitch}>{person.links.twitch}</a> : "";
  const personlinksyoutube = person.links.youtube ? <a href={person.links.youtube}>{person.links.youtube}</a> : "";
  const personlinkstiktok = person.links.tiktok ? <a href={person.links.tiktok}>{person.links.tiktok}</a> : "";
  const personlinkslinkedin = person.links.linkedin ? <a href={person.links.linkedin}>{person.links.linkedin}</a> : "";
  const personlinksother = person.links.othersocialmedia ? <a href={person.links.othersocialmedia}>{person.links.othersocialmedia}</a> : "";
  return (
    <div className="person">
      <h2 className="person-name">
        <span className="person-title">{configData.PEOPLE.PERSON_HEADER}</span>
        {person.name}
      </h2>
      <div className="person-image">{img}</div>
      <div
        className="person-bio"
        dangerouslySetInnerHTML={{ __html: safeBio }}
      />
      <div className="person-links">{personlinkstwitter}</div>
      <div className="person-links">{personlinksfacebook}</div>
      <div className="person-links">{personlinkswebsite}</div>
      <div className="person-links">{personlinksinstagram}</div>
      <div className="person-links">{personlinkstwitch}</div>
      <div className="person-links">{personlinksyoutube}</div>
      <div className="person-links">{personlinkstiktok}</div>
      <div className="person-links">{personlinkslinkedin}</div>
      <div className="person-links">{personlinksother}</div>
      <ProgramList program={filteredProgram} />
    </div>
  );
};

export default Person;
