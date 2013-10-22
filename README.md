Cloud Connecteds arbetsprov. 
================================
Todo test är grunden för Cloud Connecteds arbetsprov. 
Arbetsprovet går ut på att lägga till ny funktionalitet till webbapplikationen, få alla fallerande tester att gå genom samt förklara ett par principer i den befintliga kodbasen. Ingen befintlig funktionalitet får tas bort och inga befintliga tester får tas bort eller fallera.

Del 1
-------------------------
Webbapplikationen har idag stöd för att skapa, radera och uppdatera todos i minnet d.v.s. alla skapade todos sparas till dess att applikationen startas om. Din uppgift är att utöka applikationens funktionalitet med befintliga ramverk. Alla gränssittdelar ska implementeras med Twitter Bootstrap 2.3.2, AngularJS och angular-ui.
 1)	Hämta hem källkoden från detta respository och kör applikationen. Alla tredjepartsramverk hämtas via Nuget. 
 2)	Implementera stöd för att söka efter tillagda todos. 
    a.	Sökningen ska göras mot ConcurrentBag<IPersistable> Database i Store. Interfacet IStore får inte förändras.
    b.	En sökning på ”Mil” ska ge träff på ”buy milk”, ”throw away old milk” and ”buy a milkshake at mc donalds”. Dvs ord ska i todo-ns namn ska vara sökbara och inte kräva att användaren skriver in hela sökordet.
    c.	Följande enhetstest ska gå genom:

```csharp
[Test]
public void CanSearch()
{
    var store = // get the instance of your store that supports searching of todos
    store.Add(new Todo("buy milk"));
    store.Add(new Todo("drink milk"));
    store.Add(new Todo("buy coffee"));
    store.Add(new Todo("buy chicken"));
    store.Add(new Todo("buy sallad"));
    store.Add(new Todo("buy a milkshake at mc donalds"));

    var result = store.Search("Mil");

    result.Should().HaveCount(3);
    result.Should().ContainSingle(x => x.Name.Equals("buy milk"));
    result.Should().ContainSingle(x => x.Name.Equals("drink milk"));
    result.Should().ContainSingle(x => x.Name.Equals("buy a milkshake at mc donalds"));
}
```
 3)	Användaren ska kunna söka på todos i gränssnittet genom att skriva i en textbox. Undertiden användaren skriver visas en dropdown där användaren kan välja namnet på matchande todos. Tycker användaren enter i sökboxen eller klickar på användaren på sökikonen bredvid sökfältet byts todi-listan ”Things I need to get done” mot sökresultatet. Användaren ska kunna checka av och radera todos i sökresultatet. Sökboxen ska bara visas om det finns några todos att söka på.
 4)	Om listan på todos överstiger 10 stycken ska en paginering visas och användaren ska kunna hoppa mellan de olika sidorna. Pagineringen ska hålla koll när nya tods radera/adderas och pagineringen ska uppdateras i samma takt. 

Del 2
-------------------------
Applikationen saker helt och hållet all typ av applikationsloggning. Din uppgift är att implementera applikationsloggning med ramverket Log4Net. I utveckling ska loggarna skrivas till disk och i produktion (se del 3) ska loggarna skrivas till logentries. https://appharbor.com/addons/logentries 
Kraven för loggningen är följande:
 1) I loggen ska det debug-loggas vilken action som har exekverat. 
 2)	En generell error-logging där alla ohanterade fel error-loggas.

Del 3
-------------------------
Skapa ett gratiskonto hos AppHarbor (CANOE) och deploy’a upp applikationen. Skicka ett mail till rekrytering@cloudconnected.se men den publika länken till projektet på AppHarbor samt en zip med källkoden för projektet. 
 
