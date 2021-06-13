import * as React from 'react'
import { ShellPublic } from '../components/ShellPublic'

export const PageImprint = () => {
  return (
    <ShellPublic>
      <div className="w-full mx-auto pt-6 pb-12 min-h-screen">
        <div className="container max-w-5xl mx-auto m-8 px-4">
          <h2 className="text-3xl mb-3">Impressum</h2>
          <h3 className="text-xl mb-3">Nach § 5 German TMG</h3>
          <b>hekori GmbH</b>
          <br />
          Kastellweg 29
          <br />
          69120 Heidelberg
          <br />
          Germany
          <br />
          <span>
            <i className="mdi mdi-email" /> info@hekori.com
          </span>
          <br />
          <p>
            <b>Vertreten durch</b>
            <br />
            Dr. Sebastian F. Walter
            <br />
          </p>
          <br />
          <p>
            Amtsgericht Mannheim
            <br />
            HRB 731835
          </p>
          <div className="md:flex flex-row mt-16 mb-16">
            <div className="flex-1">
              <h2 className="text-xl font-medium mb-3">Haftungsausschluss</h2>
              <p>
                hekori übernimmt keine Garantie dafür, dass die auf dieser
                Website bereitgestellten Informationen vollständig, richtig und
                in jedem Fall aktuell sind. Insbesondere übernimmt hekori keine
                Haftung für Inhalte, die ausdrücklich oder konkludent als fremde
                Inhalte gekennzeichnet sind. Folgen Sie Verknüpfungen in das
                Internet auf der vorliegenden Website nach eigenem Ermessen.
                hekori ist nicht dafür verantwortlich, dass solche Inhalte
                vollständig, richtig, aktuell und rechtmäßig sind und nicht in
                unzulässiger Weise in Rechtsgüter Dritter eingreifen. Um dies
                auszuschließen, wurden Inhalte zum Zeitpunkt der Einbindung
                überprüft. Dies gilt auch für Inhalte von Webseiten, auf die
                durch einen Link verwiesen wird.
                <br />
                hekori behält sich das Recht vor, ohne vorherige Ankündigung
                Änderungen oder Ergänzungen der bereitgestellten Informationen
                vorzunehmen oder diese zu entfernen.
                <br />
                <br />
                Auf keinen Fall haftet hekori für Schäden, die durch fehlende
                Nutzungsmöglichkeiten oder Datenverluste im Zusammenhang mit der
                Nutzung von Dokumenten oder Informationen bzw. der Erbringung
                von Dienstleistungen entstehen, die auf dieser Website
                zugänglich sind.
              </p>
            </div>

            <div className="p-4" />

            <div className="flex-1">
              <h2 className="text-xl font-medium mb-3">Urheberrecht</h2>
              <p>
                Die durch hekori erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind
                als solche gekennzeichnet. hekori räumt das Nutzungsrecht ein,
                sich eine private Kopie für persönliche Zwecke anzufertigen.
                Dies berechtigt dagegen nicht, Materialien zu verändern und/oder
                weiterzugeben oder gar selbst zu veröffentlichen. Kein Teil
                dieser Website darf ohne schriftliche Genehmigung von hekori
                vervielfältigt oder verbreitet werden. Insbesondere eine
                gewerbliche Vervielfältigung und Weiterverwertung ist untersagt.
                <br />
                Dargestellte Marken sind eingetragene Marken (Warenzeichen) der
                jeweiligen Hersteller und von diesen geschützt. hekori ist
                bemüht, stets die Urheberrechte anderer zu beachten. Sollten Sie
                trotzdem auf eine mögliche Schutzrechtsverletzung aufmerksam
                werden, bitten wir um einen entsprechenden Hinweis. Bei
                Bekanntwerden von Rechtsverletzungen werden wir derartige
                Inhalte umgehend entfernen.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-medium mb-3">Referenzen</h2>
            <p>Artwork teilweise von https://undraw.co adaptiert.</p>
            <h2 className="text-xl font-medium mb-3">Version</h2>
            <p>v{process.env.npm_package_version}</p>
          </div>
          <div className="p-4" />
          <div className="flex-1" />
        </div>
      </div>
    </ShellPublic>
  )
}
