/** @module src/common/legalTexts */

import React from 'react';
import { Text } from 'react-native';

import Link from './Link';

/**
 * Debio license text.
 * @returns Component
 */
export function DebioLicense(props) {
  return (
    <Text style={props.style}>
      Ved å velge Debios Ø-merke eller Bærekraft-merke i annonseringen av varer godtar
      annonsøren vilkårene som framkommer her samt Debios regler for merker og merkebruk
      {'\n'}
      ( lenke: <Link url="http://debio.no/debios-merker">http://debio.no/debios-merker</Link> ).
      {'\n\n'}
      Godkjenningsmerkene kan kun brukes av virksomheter som er innmeldt
      i Debioskontrollordning, og på varer fra produksjon som er godkjent av Debio.
      Fersk Fangst forutsetter rettmessig bruk av Debios merker.
      {'\n\n'}
      Annonsøren er selv ansvarlig for dokumentasjon av sin Debio-godkjenning.
      Annonsøren godtar at Fersk Fangst har rett på at slik dokumentasjon blir
      framvist ved forespørsel.
    </Text>
  );
}

/**
 * Advertising license text.
 * @returns Component
 */
export function AdvertisingLicense(props) {
  return (
    <Text style={props.style}>
      Vi tilbyr både privatpersoner og bedrifter å reklamere i applikasjonen, samt betalt plassering.
      Ta kontakt på post@ferskfangst.no for priser og informasjon om tjenesten.
      {'\n\n'}
      Vi kan gi deg en komplett løsning, hvor vi lager reklamebanner, enten som stillbilder, eller levende bilder.
      Ta kontakt for et tilbud.
    </Text>
  );
}

/**
 * Terms and conditions text.
 * @returns Component
 */
export function TermsAndConditions(props) {
  return (
    <Text style={props.style}>
      Brukervilkår for Fersk Fangst
      {'\n\n'}
      Fersk Fangst AS er eier av denne applikasjonen, og innehar alle rettigheter.
      {'\n'}
      All bruk av denne applikasjonen skjer på eget ansvar. Utvikler og eier fraskriver seg alt
      ansvar. Bruker står selv ansvarlig for økonomisk tap, kostnader, skade, lovbrudd og
      kjøp/salg i denne applikasjonen. Dette inkluderer også evt. feil og mangler.
      {'\n'}
      Utvikler og eier frasier seg alt ansvar for annonsenes innhold. Fersk Fangst fører ingen form
      for kontroll av annonser og dets innhold.
      {'\n'}
      Annonsør står personlig til ansvar for det som annonseres i applikasjonen. Det forventes at
      annonsør forholder seg til gjeldende lover og regler i landet det gjelder, samt hva som står
      beskrevet i applikasjonens hensik, beskrevet i brukervilkårene.
      {'\n'}
      Ved å godta brukervilkårene i denne applikasjonen godtar du å overholde gjeldende lover og
      regler for varen/tjenesten som kjøpes/selges i det respektive landet handelen foregår i. Du er
      selv ansvarlig for å holde deg oppdatert.
      {'\n'}
      Fersk Fangst vil i beste mening bidra med informasjon om lover og regler innenfor kjøp/salg
      av aktuelle matvarer, råvarer og fangst. Vi fører slik informasjon på hjemmesiden vår:
      <Link url="https://www.ferskfangst.no">www.ferskfangst.no</Link>
      {'\n'}
      Ved å godta brukervilkårene for applikasjonen, godtar du/dere at Fersk Fangst og dens eier,
      Fersk Fangst AS, har alle rettigheter rundt hva som brukes av tekst og bilder i applikasjonen.
      Alle bilder og all tekst som brukes i applikasjonen kan brukes videre i andre sammenhenger.
      Annonser kan gjengis i sin helhet i andre medier og eventuelt brukes som reklame for
      applikasjonen og dens eier.
      {'\n'}
      Fersk Fangst tilbyr annonsørene å bruke både Økologisk og Bærekraft merkene som tilhører
      Debio. Annonsøren står selv ansvarlig for bruk av merkingen. Fersk Fangst fører ikke
      kontroll av merkingen.
      {'\n'}
      All merking skal være godkjent av Debio på forhånd. Er du usikker, besøk deres hjemmeside
      på www.debio.no.
      {'\n'}
      Om du/dere som annonsør velger å bruke Økologisk/Bærekraft merking i applikasjonen, kan
      Fersk Fangst og dens eier, Fersk Fangst AS, kreve gyldig dokumentasjon på lovlig og riktig
      bruk av merkingen. Du står selv ansvarlig både lovlig og økonomisk for din bruk av
      merkingen.
      {'\n\n'}
      Hensikt
      {'\n\n'}
      Hensikten med applikasjonen er å skape et åpent marked for kjøp/salg av fangst, råvarer,
      ferskvarer, viltkjøtt, sjømat, altså det meste innen mat og drikke, samt opplevelser.
      Applikasjonen er i første omgang ment som et hjelpemiddel for det private marked, hvor
      kjøp/salg vil være basert på tilfeldige, små mengder av den aktuelle varen. Små og
      mellomstore bedrifter er også velkommen til å bruke applikasjonen.
      {'\n\n'}
      Fersk Fangst AS - Org.nr 919022418
      {'\n'}
      Kippersmauet 2a, 5005 Bergen, Norway
      {'\n\n'}
      Vi oppfordrer små aktører til å aktivt bruke applikasjonen for å nå ut til et større
      og bredere marked. Samt at privatpersoner deler på det de har til overs.
      Vi håper at applikasjonen vil bidra til økt deling av matvarer og opplevelser, samt bidra til
      vekst for små, lokale aktører.
      {'\n\n'}
      Har du spørsmål?
      {'\n\n'}
      <Link url="mailto:post@ferskfangst.com">post@ferskfangst.com</Link>
      {'\n\n'}
      Besøk nettsiden vår for utdypende informasjon om applikasjonen samt lover og regler.
      {'\n\n'}
      <Link url="https://www.ferskfangst.no">www.ferskfangst.no</Link>
    </Text>
  );
}

/**
 * Privacy policy text.
 * @returns Component
 */
export function PrivacyPolicy(props) {
  return (
    <Text style={props.style}>
      Ved å lage en bruker hos Fersk Fangst godtar du følgende tekst som angår ‘’Retningslinjer
      for personvern’’.
      For dem som logger inn med en Facebook eller Google konto gjelder følgende tekst i tillegg
      til vilkårene du aksepterte fra enten Facebook eller Google.
      {'\n\n'}
      For at det skal være mulig for oss å føre kontroll på brukermassene og innholdet i
      applikasjonen, er det nødvendig at brukerne logger seg inn med en unik bruker.
      Dette gjelder spesielt for dem som skal lage en annonse. Man vil ikke kunne lage en
      annonse i applikasjonen foruten en bruker. Kun da kan vi føre kontroll og fjerne upassende
      og ulovlig materiale.
      {'\n\n'}
      Personopplysningene vi har om hver bruker er begrenset. Ditt navn og din e-post adresse
      blir lagret i systemet vårt sammen med passordet tilhørende brukerprofilen din. Passordet
      blir kryptert.
      Kommunikasjon via ‘’Chat’’ funksjonen i applikasjonen vil være kun tilgjengelig mellom deg
      og motparten du har valgt å prate med.
      Brukerdata slik som annonser du lager vil også være tilknyttet din profil.
      Brukerstatistikk vil også bli lagret og brukt til videreutvikling av applikasjonen og markedet.
      {'\n\n'}
      Fersk Fangst lagrer all informasjon som er beskrevet ovenfor, inntil brukeren selv velger å
      slette sin egen profil. Samtalene du har hatt med en motpart via chat funksjonen vil
      fremdeles være tilgjengelig for motparten selv om du sletter profilen. Vi forbeholder oss
      retten til å beholde brukerstatistikk selv om profilen blir slettet.
      {'\n\n'}
      Fersk Fangst vil benytte seg av profilering. Dette er for å kunne føre en oversikt over
      statistikk og brukervaner. Dette er blitt normal praksis for de fleste tjenester i dag.
      Statistikk og brukerdata vil bli brukt til videreutvikling og forbedring av applikasjonen.
      Hensikten er å kunne skape bedre og tilpassede brukeropplevelser for deg som bruker.
      {'\n\n'}
      Applikasjonen eies og drives av Fersk Fangst AS. Applikasjonen er utviklet av Multimedia
      Nordic AS som også står for digital drift og lagring.
      All data og opplysninger er det kun Fersk Fangst AS og Multimedia Nordic AS som har
      tilgang på.
      {'\n\n'}
      Ønsker du å ta kontakt? Du har rett til innsyn, retting, sletting, dataportabilitet, å kreve at
      behandlingen av personopplysninger begrenses, og å motsette seg visse former for
      behandling. Du har også rett til å klage til Datatilsynet om vi behandler deg i strid med
      reglene.
      {'\n\n'}
      Fersk Fangst AS
      {'\n'}
      Kippersmauet 2a
      {'\n'}
      5005 Bergen
      {'\n\n'}
      <Link url="mailto:post@ferskfangst.com">post@ferskfangst.com</Link>
    </Text>
  );
}

export default {
  DebioLicense,
  AdvertisingLicense,
  TermsAndConditions,
  PrivacyPolicy
};
