export interface Question {
  id: number;
  question: string;
  answer: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Systemy liczbowe (liczenia), przykłady zapisu liczby w każdym z nich.",
    answer: `Dwa podstawowe systemy to system pozycyjny lub addytywny.
Systemy pozycyjne bazują na kolejności, pozycji znaków, nadając wagi każdemu w zależności od pozycji znaku.
Przykłady to 123 w systemie dziesiętnym lub 1011 w systemie dwójkowym, które jest równe 1 + 2 + 0 + 8 = 11 w systemie dziesiętnym.
W informatyce używane są też systemy bazujące na wielokrotnościach 2
- ósemkowy oraz szesnastkowy - gdzie znaki z wagą od 10 do 16 wyrażane są kolejnymi litarami alfabetu.
Systemy addytywne bazują na sumie wartości znaków, gdzie ich kolejność nie ma znaczenia, a jest kwestią konwencji.
Przykład to system pierwotny - liczenie zapałek/słupków lub system rzymski - np. C XL V = V XL C = 100 + 40 + 5 = 145`
  },
  {
    id: 2,
    question: "Programowanie strukturalne i niestrukturalne.",
    answer: `Programowanie strukturalne i niestrukturalne to dwa różne podejścia do budowy programu, które znacząco wpłynęły na rozwój informatyki.
Programowanie niestrukturalne, stosowane na początku historii programowania, opierało się na liniowym wykonywaniu kodu oraz swobodnych skokach w kodzie (instrukcja “goto”). Powodowało to powstawanie chaotycznego „spaghetti code”, który był trudny w analizie, testowaniu i poprawianiu błędów, ponieważ kod nie miał uporządkowanej, logicznej struktury.
W odpowiedzi na te problemy pojawiło się programowanie strukturalne, które opiera się na: sekwencji, instrukcjach warunkowych oraz pętlach. Dzięki eliminacji niekontrolowanych skoków kod staje się czytelniejszy, bardziej przewidywalny i znacznie łatwiejszy w utrzymaniu. Programowanie strukturalne stało się podstawą współczesnych metod tworzenia oprogramowania i fundamentem dla programowania proceduralnego, obiektowego oraz wielu współczesnych języków.`
  },
  {
    id: 3,
    question: "Rola wskaźników w programowaniu.",
    answer: `Rolą wskaźnika jest przechowywanie adresu do pamięci konkretnej zmiennej. Dzięki wskaźnikom, możliwa jest dynamiczna alokacja i dealokacja pamięci, co jest kluczowe, gdy nie są znane rozmiary potrzebnych zasobów przed startem programu.
Wskaźniki pozwalają też na manipulację wartościami zmiennych przez dowolną funkcję, co pozwala działać poza zakresem funkcji.`
  },
  {
    id: 4,
    question: "Rola w programowaniu instrukcji pętli, rodzaje instrukcji pętli.",
    answer: `Pętle pozwalają na wykonanie danej instrukcji, ciągu instrukcji wiele razy, w zależności od spełnienia określonego warunku. Ze względu na warunki, są 3 główne rodzaje pętli: for, while, do-while. For oraz while sprawdzają warunek przed wykonaniem instrukcji, do-while wykona się przynajmniej raz instrukcje przed sprawdzeniem.`
  },
  {
    id: 5,
    question: "Jakie jest znaczenie asercji początkowej i końcowej algorytmu?",
    answer: `Asercja początkowa i końcowa algorytmu służą do formalnego udowadniania poprawności i specyfikacji algorytmu.
Asercja początkowa określa warunki, które muszą być spełnione przed rozpoczęciem pracy algorytmu, najczęściej warunki dla danych wejściowych.
Asercja końcowa określa przewidywany warunki, jakie powinny być spełnione po zakończeniu działania algorytmu.
Dzięki nim można udowodnić poprawność algorytmu i łatwiej testować programy pod kątem poprawności logicznej.`
  },
  {
    id: 6,
    question: "Czym różni się rekurencja ogonowa od bezogonowej?",
    answer: `Rekurencja ogonowa może zostać skutecznie zastąpiona przez instrukcje pętli. Ostatnią instrukcją jest wywołanie rekurencyjne.
Rekurencja bezogonowa wykonuje po wywołaniu dodatkowe instrukcje. W związku z tym nie może zostać zoptymalizowana. Blokuje zasoby stosu do czasu wykonania wywołań.`
  },
  {
    id: 7,
    question: "Porównaj własności statycznej tablicy indeksowanej z jednokierunkową listą wiązaną.",
    answer: `Tablica ma z góry określony, jednorodny rozmiar w pamięci. Lista jest tworzona dynamicznie, przez co jest większych rozmiarów, a elementy mogą być w dowolnym miejscu w pamięci.
Dostęp do elementów w tablicy jest prosty, poprzez indeks elementu, w liście należy przejść przez wszystkie kolejne elementy, aż dojdziemy do wybranego.
Usuwanie czy dodawanie elementów z kolei jest prostsze w liście, ponieważ sprowadza się do zmiany wskaźników, w tablicy wymaga przesunięcia kolejnych elementów.`
  },
  {
    id: 8,
    question: "Jakie znasz algorytmy przeszukiwania drzew binarnych?",
    answer: `Przeszukiwanie drzewa binarnego polega na odwiedzeniu wszystkich węzłów w określonej kolejności. Dwa główne podejścia to przeszukiwanie wgłąb (Depth-First Search) oraz przeszukiwanie wszerz (Breadth-First Search).
Przeszukując wgłąb (DFS) schodzimy jak najgłębiej w drzewo, a następnie wracamy do poprzednich węzłów. Wyróżnia się tutaj 3 warianty:
● pre-order: węzeł, lewo, prawo;
● in-order: lewo, węzeł, prawo;
● post-order: lewo, prawo, węzeł.
Jeśli drzewo jest większe dzielimy je na podrzewa i rozpisujemy rekurencyjnie przejścia.
Przeszukiwanie wszerz działa poziomami, zaczyna się od korzenia, a następnie przechodzi się do węzłów na każdym kolejnym poziomie, od lewej, używając kolejki.`
  },
  {
    id: 9,
    question: "Jakie są własności dynamicznego LIFO-stosu i FIFO-kolejki?",
    answer: `Stos i kolejka to ustrukturyzowane sposoby zapisu danych. Różnią się one przede wszystkim sposobem obsługi elementów.
W LIFO stosie, element, który został dopisany jako ostatni, jest przeznaczony do wykorzystania jako pierwszy (Last In First Out).
W FIFO kolejce, element dopisany ostatni, jest użyty jako ostatni (First In First Out).`
  },
  {
    id: 10,
    question: "Czym jest złożoność obliczeniowa algorytmów i od czego ona zależy?",
    answer: `Złożoność obliczeniowa algorytmu określa szacowane zasoby - czas i pamięć - jakie są niezbędne do wykonania algorytmu.
Złożoność jest określana za pomocą notacji O(n), nie w jednostce czasu, lecz w zależności od danych wejściowych.
Np. czas przejścia po wszystkich n-elementach tablicy określa się jako O(n), a posortowanie takiej tablicy w słabym przypadku może wynieść n^2.
Do złożoności obliczeniowej można również podać złożoność pamięciową, czyli ilość zasobów pamięci jakie zaangażuje algorytm na swoje potrzeby.`
  },
  {
    id: 11,
    question: "Rodzaje, charakterystyka i przeznaczenie rejestrów procesora.",
    answer: `Rejestry procesora to najszybsza pamięć w komputerze, umieszczona bezpośrednio w CPU, o bardzo małej pojemności. Przechowują dane, adresy oraz informacje sterujące potrzebne podczas wykonywania instrukcji.
Wyróżniamy następujące rodzaje rejestrów:
● ogólnego przeznaczenia - przechowują dane tymczasowe i wyniki obliczeń;
● adresowe - przechowują adresy pamięci używane podczas odwołań do danych;
● licznik rozkazów - wskazuje adres kolejnej instrukcji do wykonania;
● rejestr instrukcji - przechowuje aktualnie wykonywaną instrukcję;
● rejestr flag (rejestr stanu) - zawiera informacje opisujące stan procesora, wpływa na wykonywania instrukcji warunkowych;
● wskaźnik stosu - przechowuje adres wierzchołka stosu;
● rejestry specjalne - kontrolne i segmentowe, odpowiadają za tryby pracy procesora i zarządzanie pamięcią.`
  },
  {
    id: 12,
    question: "Istota pamięci wirtualnej, mechanizm tłumaczenia adresu wirtualnego na rzeczywisty.",
    answer: `Pamięć wirtualna to technika dająca każdemu procesowi wrażenie posiadania własnej, dużej przestrzeni adresowej, niezależnie od faktycznej ilości pamięci RAM. Umożliwia uruchamianie programów większych niż dostępna pamięć fizyczna oraz zapewnia izolację i ochronę między procesami.
Przestrzeń adresowa procesu dzielona jest na strony, które mapowane są na fizyczne ramki w RAM. Tłumaczeniem adresu wirtualnego na fizyczny zajmuje się Memory Management Unit (MMU), korzystając z tablicy stron. Dla przyspieszenia translacji stosuje się Translation Lookaside Buffer (TLB) - szybką pamięć podręczną przechowującą ostatnio używane odwzorowania.
Jeśli szukanego adresu nie ma w TLB, MMU sięga do tablicy stron. Jeśli strona nie znajduje się w RAM, dochodzi do page fault i system operacyjny ładuje ją z dysku do wolnej ramki i wznawia wykonanie instrukcji.`
  },
  {
    id: 13,
    question: "Charakterystyka czynników wpływających na szybkość wykonywania rozkazów przez procesor.",
    answer: `Szybkość wykonywania rozkazów przez procesor zależy od kilku czynników. Najważniejszymi są: ilość cykli wymaganych do wykonania jednej instrukcji (Cycles Per Instruction) oraz częstotliwość taktowania rdzenia, która określa liczbę cykli na sekundę. Oba czynniki wyznaczają przepustowość procesora.
Ważna jest mikroarchitektura, wprowadzone techniki wpływające na wydajność: potokowanie podział instrukcji na etapy realizowane równolegle; wykonywanie poza kolejnością - pozwala omijać przestoje; przewidywanie skoków - redukuje opóźnienia, ale nietrafione skutkuje koniecznością opróżnienia potoku.
Ostatnimi czynnikami są: pamięć podręczna (cache), która redukuje czas oczekiwania danych oraz liczba rdzeni oraz wątków procesora, które umożliwiają obsługę instrukcji równolegle.`
  },
  {
    id: 14,
    question: "Szeregowanie procesów, jakie algorytmy są stosowane w szeregowaniu procesów w systemach operacyjnych.",
    answer: `Szeregowanie procesów to mechanizm systemu operacyjnego polegający na wyborze procesu, który w danym momencie otrzyma dostęp do procesora.
Algorytmy dzielą się na niewywłaszczające, gdzie procesor działa do zakończenia lub zablokowania procesu oraz wywłaszczające, gdzie system może odebrać CPU działającem procesowi. Podstawowe algorytmy:
● procesy obsługiwane w kolejności zgłoszenia - First Come First Serve (FCFS);
● pierwszy obsługiwany jest proces o najkrótszym czasie wykonania - Shortest Job First (SJF);
● procesy z najkrótszym pozostałym czasem wykonania - Shortest Remaining Time First (SRTF);
● proces otrzymuje kwant czasu, po upływie którego jest wywłaszczany (Round Robin);
● szeregowanie priorytetów.
Stosuje się wielopoziomowe kolejki łączące algorytmy w celu równoważenia wydajności.`
  },
  {
    id: 15,
    question: "Synchronizacja procesów, jakie metody synchronizacji procesów można wykorzystać w programach komputerowych.",
    answer: `Synchronizacja procesów zapewnia poprawną współpracę wielu procesów lub wątków korzystających z tych samych zasobów oraz chroni sekcje krytyczne przed jednoczesnym dostępem.
Stosuje się różne metody, w tym semafory, muteksy, monitory i zmienne warunkowe, które pozwalają uniknąć wyścigów, zakleszczeń i innych błędów współbieżności. W nowoczesnym programowaniu stosuje się także algorytmy bezblokujące (lock-free), które zwiększają wydajność i skalowalność działania.
Semafor - licznik kontrolujący dostęp do zasobów.
Muteks - pozwala tylko jednemu wątkowi korzystać z zasobu naraz.
Monitor - mechanizm synchronizacji łączący dane, muteks i warunki.
Zmienna warunkowa - pozwala wątkom czekać na określone zdarzenie.`
  },
  {
    id: 16,
    question: "Zakleszczenie procesów, jakie metody postępowania z zakleszczeniami są stosowane we współczesnych systemach operacyjnych.",
    answer: `Zakleszczenie to sytuacja, w której procesy wzajemnie czekają na zasoby i żaden nie może kontynuować pracy. Występuje, gdy spełnione są cztery warunki Coffmana: wzajemne wykluczanie; przetrzymywanie i oczekiwanie; brak wywłaszczenia; oczekiwanie cykliczne.
Aby przeciwdziałać zakleszczeniom, systemy operacyjne stosują cztery podejścia:
● zapobieganie - trwała eliminacji jednego z warunków Coffmana;
● unikanie przy użyciu algorytmu bankiera - przydzielanie zasobów tylko, gdy system pozostaje w stanie bezpiecznym;
● wykrywanie i usuwanie - oparte na analizie grafu przydziału zasobów, system usuwa zakleszczenie poprzez wywłaszczenie zasobu lub zabicie procesu;
● ignorowanie problemu - w systemach ogólnego przeznaczenia, zakłada się rzadkie występowanie problemu.`
  },
  {
    id: 17,
    question: "Strategie przydziału segmentów pamięci stosowane w systemach operacyjnych.",
    answer: `
Przydział pamięci wykonuje się w oparciu o segmentację, czyli podział pamięci procesu na logiczne segmenty o zmiennym rozmiarze, odpowiadający strukturze programu: kod, dane czy stos.
Przydział wolnego miejsca w pamięci fizycznej dla segmentu odbywa się według strategii:
- First Fit - przydzielany jest pierwszy, wystarczająco duży, wolny obszar - rozwiązanie szybkie, ale prowadzące do fragmentacji na początku pamięci;
- Best Fit - przydzielany jest najmniejszy pasujący obszar - minimalizowane są straty miejsca w pamięci, ale zostawiane jest wiele małych fragmentów;
- Worst Fit - przydzielany jest największy dostępny obszar - zostawiane są duże resztki, które mogą być ponownie używane.
Segmentacja prowadzi do fragmentacji zewnętrznej, potrzebne są określone ciągłe fragmenty wolnej przestrzeni pamięci. Stosuje się kompaktowanie lub łączy segmentację ze stronicowaniem - segmenty są dzielone na strony stałego rozmiaru, które mogą być rozmieszczone w nieciągłych ramkach pamięci, eliminując fragmentację zewnętrzną. Umożliwia ona również współdzielenie segmentów pamięci między procesami.`
  },
  {
    id: 18,
    question: "System plików i jego realizacja w systemie komputerowym.",
    answer: `System plików to mechanizm systemu operacyjnego umożliwiający organizację, przechowywanie i odczyt danych na nośnikach pamięci masowej.
System operacyjny wykorzystuje system plików do mapowania logicznej struktury plików na fizyczną organizację danych na nośniku. Zapewnia strukturę katalogową, zarządzanie metadanymi plików oraz kontrolę dostępu. Pliki mogą być alokowane w sposób ciągły, łańcuchowy lub indeksowy. Współczesne systemy stosują mechanizmy zarządzania wolną przestrzenią oraz dziennikowanie w celu zapewnienia spójności danych.
Przykładami systemów plików są NTFS, FAT32, ext4.`
  },
  {
    id: 19,
    question: "Sposób wyznaczania trasy dla przesłania pakietu przy wykorzystaniu protokołów routingu dynamicznego.",
    answer: `Routing dynamiczny polega na automatycznym wyznaczaniu tras poprzez wymianę informacji między routerami.
Stosuje się trzy typy protokołów:
● Distance vector (np. RIP) - każdy router zna tylko odległości do sąsiadów i wymienia tablice routingu z sąsiadami. Trasy wyznaczane algorytmem Bellmana-Forda, gdzie metryką jest liczba hopów;
● Link state (np. OSPF) - każdy router zna pełną topologię sieci, rozsyła informacje o stanie swoich łączy do wszystkich routerów i wyznacza trasy algorytmem Dijkstry, metryką jest kosz łącza.
● Path vector (np. BGP) - stosowany między systemami autonomicznymi, analizuje całą ścieżkę AS, co pozwala uniknąć pętli i stosować polityki routingu.
Router wybiera najlepszą trasę na podstawie metryki i aktualizuje tablice routingu w procesie konwergencji, czyli procesie w którym wszystkie routery osiągają spójny obraz topologii.`
  },
  {
    id: 20,
    question: "Porównanie protokołów routingu dynamicznego: RIP oraz OSPF.",
    answer: `RIP (Routing Information Protocol) i OSPF (Open Shortest Path First) to protokoły routingu dynamicznego stosowane do wyznaczania tras w sieciach IP.
RIP - protokół typu distance vector - routery wymieniają się tablicami routingu z sąsiadami, trasy wyznaczane są algorytmem Bellmana-Forda, a metryką jest liczba przeskoków (z limitem 15, co ogranicza zasięg). RIP charakteryzuje się wolną konwergencją - proces aktualizacji obrazu topologi we wszystkich routerach - i słabą skalowalnością, dlatego przeznaczony jest do małych sieci.
OSPF - protokół typu link state - każdy router posiada pełną wiedzę o topologii sieci, trasy wyznaczane są algorytmem Dijkstry na podstawie kosztu łącza. OSPF obsługuje podział sieci na obszary, zapewnia szybką konwergencję i dobrą skalowalność, przeznaczony do większych sieci.`
  },
  {
    id: 21,
    question: "Rodzaje i charakterystyka metod unikania kolizji stosowane w sieciach przewodowych oraz bezprzewodowych.",
    answer: `Kolizje występują gdy kilka urządzeń jednocześnie nadaje przez wspólne medium transmisyjne.
W sieciach przewodowych stosowano CSMA/CD — urządzenie nasłuchuje medium przed nadaniem, wykrywa kolizję podczas transmisji i ponawia ją po losowym czasie. W nowoczesnych sieciach Ethernet z przełącznikami każde łącze tworzy osobną domenę kolizji, więc CSMA/CD jest praktycznie nieużywane.
W sieciach bezprzewodowych wykrycie kolizji jest niemożliwe, bo urządzenie nie może jednocześnie nadawać i nasłuchiwać. Stosuje się CSMA/CA — urządzenie nasłuchuje medium, a przed nadaniem odczekuje losowy czas, starając się kolizji uniknąć. Uzupełnia go mechanizm RTS/CTS, który rozwiązuje problem ukrytej stacji: dwa urządzenia mogą nie słyszeć siebie nawzajem, ale obie komunikują się z tym samym punktem dostępowym. RTS/CTS rezerwuje medium przed właściwą transmisją.`
  },
  {
    id: 22,
    question: "Rodzaje i charakterystyka technologii stosowanych w sieciach rozległych.",
    answer: `Sieci WAN łączą odległe sieci komputerowe na dużych obszarach geograficznych. Stosuje się w nich dwa podstawowe modele transmisji.
Komutacja obwodów rezerwuje dedykowane połączenie na czas trwania sesji — zasoby są zajęte niezależnie od tego czy dane są aktualnie przesyłane. Stosowana w tradycyjnej telefonii.
Komutacja pakietów dzieli dane na pakiety przesyłane niezależnie, współdzieląc zasoby sieci — stanowi podstawę działania Internetu.
Technologie stosowane w sieciach WAN:
● MPLS kieruje ruchem na podstawie etykiet zamiast analizy adresów IP, co zapewnia przewidywalność i jakość usług — szeroko stosowane przez operatorów telekomunikacyjnych;
● łącza światłowodowe zapewniają wysoką przepustowość na duże odległości i stanowią fizyczną podstawę nowoczesnych sieci WAN;
● VPN umożliwia bezpieczne tunelowanie ruchu przez publiczną infrastrukturę sieciową.`
  },
  {
    id: 23,
    question: "Charakterystyka stosu protokołów TCP/IP.",
    answer: `Stos protokołów TCP/IP to podstawowy model komunikacji w Internecie, składający się z czterech warstw.
1. Warstwa dostępu do sieci - odpowiada za fizyczne przesyłanie danych w sieci lokalnej - obejmuje protokoły takie jak Ethernet czy Wi-Fi.
2. Warstwa internetowa - odpowiada za adresowanie i routing pakietów między sieciami przy użyciu protokołu IP.
3. Warstwa transportowa - zapewnia komunikację między aplikacjami. TCP jest protokołem połączeniowym, zapewniającym niezawodne dostarczenie danych z potwierdzeniami. UDP jest bezpołączeniowy, szybszy, bez gwarancji dostarczenia - stosowany tam gdzie liczy się szybkość, np. w transmisji video.
4. Warstwa aplikacji - obejmuje protokoły używane bezpośrednio przez programy, takie jak HTTP, FTP czy SMTP.`
  },
  {
    id: 24,
    question: "Istota działania zdalnego wywoływania procedur (RPC) - na wybranym przykładzie.",
    answer: `RPC (Remote Procedure Call) umożliwia wywoływanie procedur znajdujących się na zdalnym komputerze w sposób zbliżony do wywołania lokalnego — programista wywołuje funkcję nie martwiąc się szczegółami komunikacji sieciowej.
Mechanizm działa następująco: po stronie klienta przechwytuje się wywołanie (stub klienta fragment kodu, działający jako zamiennik procedury); serializuje parametry (marshalling); przesyła żądanie przez sieć do serwera. Po stronie serwera odbiera się żądanie (stub serwera); deserializuje parametry i wywołuje właściwą procedurę. Wynik jest serializowany i odesłany do klienta, gdzie odpakowuje się go i zwraca do wywołującego kodu.
Przykładem jest aplikacja bankowa, gdzie klient wywołuje funkcję SprawdźSaldo() — lokalny stub serializuje numer konta, przesyła żądanie do serwera centralnego, który wykonuje procedurę i odsyła wynik.`
  },
  {
    id: 25,
    question: "Czym jest paradygmat programowania? Wymień kilka paradygmatów programowania",
    answer: `Paradygmat programowania jest to sposób podejścia do tworzenia programu komputerowego. Określa on fundamentalne mechanizmy i podejścia - najczęściej w danym języku programowania.
Obejmuje sposoby organizacji kodu i rozwiązywania problemów w określonym stylu. Najważniejsze paradygmaty: imperatywny; funkcyjny; obiektowy; logiczne; deklaratywne. Współczesne języki często łączą wiele paradygmatów jednocześnie`
  },
  {
    id: 26,
    question: "Zdefiniuj pojęcie klasy w programowaniu obiektowym i omów jej składowe",
    answer: `Klasy w programowaniu obiektowym to wzorzec, na podstawie którego tworzone są obiekty definiuje ich strukturę i zachowanie.
Składowe klasy:
● pola (atrybuty) - zmienne przechowujące dane definiujące stan obiektu;
● metody - funkcje określające zachowanie obiektu i operacje na jego danych;
● konstruktor - specjalna metoda inicjalizująca obiekt przy tworzeniu instancji;
● modyfikator dostępu - kontrolują widoczność pól i metod, realizują enkapsulację.
Klasu umozliwiają organizację kodu oraz realizację zasad programowania obiektowego, takie jak enkapsulacja i dziedziczenie.`
  },
  {
    id: 27,
    question: "Na czym polega zjawisko polimorfizmu w programowaniu obiektowym?",
    answer: `Polimorfizm (wielopostaciowość) w programowaniu obiektowym odnosi się on do zdolności obiektów do przyjmowania wielu form - dzięki czemu obiekty mogą reagować na tę samą metodę w różny sposób. Interfejs może mieć różne implementacje, zależne od typu obiektu.
Wyróżnia się:
● polimorfizm statyczny - realizowany w czasie kompilacji - przeciążanie metod;
● polimorfizm dynamiczny - rozstrzygany w czasie wykonania - nadpisywanie metod.
Przykład: klasy Pies i Kot dziedziczą z klasy Zwierzę, obie implementują metodę wydajDźwięk(), która daje różne efekty w zależności od zwierzęcia.
Dzięki polimorfizmowi kod staje się bardziej elastyczny i łatwiejszy do rozbudowy.`
  },
  {
    id: 28,
    question: "Co to są metody anonimowe i wyrażenia strzałkowe (lambda) w programowaniu dynamicznym?",
    answer: `Metoda anonimowa (funkcja anonimowa) to funkcja bez nazwy, definiowana i używana bezpośrednio w miejscu wywołania, najczęściej jako argument przekazywany do innej metody.
Wyrażenie strzałkowe (lambda) to skrócona, bardziej zwięzła forma zapisu funkcji anonimowej, korzystająca z operatora => (stąd nazwa strzałkowe).
Umożliwiają przekazywanie funkcji jako argumentów oraz stosowanie ich w operacjach na danych, takich jak filtrowanie, mapowanie czy sortowanie. Dzięki nim kod staje się krótszy i bardziej elastyczny, szczególnie w programowaniu funkcyjnym i dynamicznym.`
  },
  {
    id: 29,
    question: "Scharakteryzuj krótko platformę .NET.",
    answer: `Platforma .NET to środowisko programistyczne stworzone przez Microsoft, umożliwiające tworzenie aplikacji na różne platformy systemowe. Jej głównym elementem jest środowisko uruchomieniowe CLR (Common Language Runtime), które zarządza pamięcią, obsługuje wyjątki i wykonuje kod pośredni.
Platforma udostępnia także wspólny system typów (CTS) oraz bogate biblioteki klas. Dzięki temu pozwala tworzyć aplikacje w różnych językach, takich jak C#, F# czy VB.NET, i uruchamiać je w zunifikowanym środowisku.`
  },
  {
    id: 30,
    question: "Różnice pomiędzy grafiką rastrową i wektorową oraz ich zastosowania.",
    answer: `Grafika rastrowa zapisuje obraz jako siatkę pikseli o określonych wymiarach i barwach. Jest zależna od rozdzielczości — przy powiększaniu traci jakość. Stosowana głównie do zdjęć i obrazów o złożonej kolorystyce. Przykładowe formaty: JPEG, PNG, BMP.
Grafika wektorowa opisuje obraz za pomocą obiektów matematycznych: linii, krzywych i figur z określonymi parametrami i kolorami. Jest niezależna od rozdzielczości i może być skalowana bez utraty jakości. Stosowana do logotypów, ikon, ilustracji i grafiki technicznej. Przykładowe formaty: SVG, AI, EPS.`
  },
  {
    id: 31,
    question: "Omów podstawowe pojęcia typografii.",
    answer: `Typografia to dziedzina zajmująca się projektowaniem i aranżacją tekstu pod względem czytelności i estetyki.
Podstawowe pojęcia:
● krój pisma — unikalny zestaw znaków o wspólnych cechach graficznych;
● czcionka — konkretne wykonanie kroju pisma, uwzględniające jego rozmiar i styl;
● font — cyfrowa wersja czcionki;
● kroje pisma dzielą się na szeryfowe (z ozdobnikami, np. Times New Roman), bezszeryfowe (bez ozdobników, np. Arial) oraz monospace (o stałej szerokości znaku, np. Courier);
● majuskuły — wielkie litery; minuskuły — małe litery;
● interlinia — odstęp między wierszami tekstu;
● kerning — regulacja odstępu między konkretną parą znaków;
● tracking — równomierny odstęp między wszystkimi znakami w tekście;
● styl pisma — odmiany takie jak regular, italic, bold;
● wyrównanie tekstu — do lewej, prawej, wyśrodkowane, justowanie.`
  },
  {
    id: 32,
    question: "Omów podstawowe formaty plików graficznych.",
    answer: `Formaty plików graficznych określają sposób zapisu i kompresji obrazu.
Formaty rastrowe:
● JPEG/JPG — kompresja stratna, małe rozmiary plików, stosowany do zdjęć;
● PNG — kompresja bezstratna, obsługuje przezroczystość;
● GIF — obsługuje proste animacje i przezroczystość, ograniczona paleta kolorów;
● TIFF — bezstratny format wysokiej jakości, stosowany w druku i zastosowaniach profesjonalnych;
● BMP — mapa bitowa, bezstratny, duże rozmiary plików;
● PSD — edytowalny format programu Photoshop, przechowuje informacje o warstwach.
Formaty wektorowe:
● SVG — otwarty format wektorowy, skalowalny bez utraty jakości;
● AI, EPS — formaty stosowane w profesjonalnej grafice wektorowej.`
  },
  {
    id: 33,
    question: "Omów podstawowe etapy tworzenia animacji komputerowej.",
    answer: `Tworzenie animacji komputerowej dzieli się na trzy główne etapy.
Preprodukcja (planowanie):
● opracowanie koncepcji i scenariusza;
● projekt postaci i scenografii;
● storyboard — graficzny plan ujęć;
● animatik — wstępna wersja czasowa storyboardu.

Produkcja:
● modelowanie obiektów 3D;
● teksturowanie — nadawanie powierzchni materiałów i kolorów;
● rigging — tworzenie szkieletu umożliwiającego animację;
● animowanie — definiowanie ruchu;
● oświetlenie i ustawienie kamery.

Postprodukcja (wykończenie):
● renderowanie — generowanie finalnych klatek;
● kompozycja i montaż;
● udźwiękowienie i efekty`
  },
  {
    id: 34,
    question: "Omów technologie prezentacji scen 3D na stronach internetowych.",
    answer: `Prezentacja scen 3D na stronach internetowych opiera się na renderowaniu z wykorzystaniem karty graficznej bezpośrednio w przeglądarce, bez potrzeby instalowania wtyczek.
Podstawowe technologie:
● WebGL — niskopoziomowe API umożliwiające renderowanie grafiki przy użyciu GPU;
● WebGPU — nowocześniejszy następca WebGL, zapewniający lepszą wydajność i większą kontrolę nad GPU;
● biblioteki bazujące na WebGL, np. Three.js, które upraszczają tworzenie scen, kamer i oświetlenia;
● X3D — deklaratywny standard opisu sceny (XML, JSON), który można zintegrować z HTML.
Modele 3D przechowywane są w wyspecjalizowanych formatach, takich jak glTF (GL Transmission Format), co pozwala tworzyć interaktywne aplikacje i wizualizacje działające w przeglądarce.`
  },
  {
    id: 35,
    question: "Na czym polega uczenie, bądź samoistne uczenie się, sieci neuronowych?",
    answer: `Uczenie sieci neuronowych polega na dostosowywaniu wag połączeń między neuronami tak, aby minimalizować funkcję straty mierzącą błąd działania sieci.
W uczeniu nadzorowanym sieć dostaje dane wejściowe wraz z poprawnymi odpowiedziami. Na podstawie błędu między wynikiem sieci, a wartością oczekiwaną następuje korekcja wag. Najczęściej wykorzystuje się do tego propagację wsteczną błędu oraz metodę spadku gradientu, stopniowo zmniejszając błąd.
W uczeniu nienadzorowanym sieć nie dostaje poprawnych odpowiedzi, lecz samodzielnie wykrywa zależności, wzorce i grupy w danych. Przykładem są mapy Kohonena (Self-Organizing Maps), służących do grupowania i wizualizacji wielowymiarowych danych.
W uczeniu ze wzmocnieniem sieć uczy się poprzez interakcję ze środowiskiem, otrzymując nagrody lub kary za swoje działania.
Proces uczenia jest podstawą działania współczesnych systemów sztucznej inteligencji.`
  },
  {
    id: 36,
    question: "Jak sądzisz - w jakim celu buduje się systemy sztucznego życia?",
    answer: `Sztuczne życie (ALife) to dziedzina nauki badająca zjawiska charakterystyczne dla życia poprzez ich symulowanie i odtwarzanie w systemach sztucznych. Systemy buduje się w kilku celach:
● naukowym - zrozumienie mechanizmów biologicznych takich jak ewolucja, adaptacja, emergencja złożoności i warunków powstawania życia (autopoiesis);
● inżynierskim - tworzenie algorytmów inspirowanych naturą: genetycznych, rojowych (PSO, ACO), mrówkowych, stosowanych w optymalizacji i uczeniu maszynowym;
● modelowania - symulowanie zachowań populacji, ekosystemów i systemów wieloagentowych;
● robotycznym - projektowanie autonomicznych agentów zdolnych do adaptacji.
Wyróżnia się ALife miękkie (symulacje), twarde (robotyka) i mokre (syntetyczna biochemia).`
  },
  {
    id: 37,
    question: "Co możesz powiedzieć o własnościach i zastosowaniach sterowania rozmytego?",
    answer: `Sterowanie rozmyte to metoda sterowania oparta na logice rozmytej. Wartości to nie tylko 'tak'/'nie', lecz także stany pośrednie. Np. 'trochę zimno', 'bardzo szybko'.
Sterowanie:
● dobrze radzi sobie z nieliniowością układów;
● jest odporne na zakłócenia i zmiany parametrów;
● daje płynne sterowanie;
● może mieć czytelną postać językową.
Stosowane jest np. w motoryzacji - wspomaganie; przemysł - regulacja temperatur, ciśnienia; robotyka - sterowanie ruchem.`
  },
  {
    id: 38,
    question: "Czy drzewo decyzyjne jest metodą reprezentacji wiedzy i dlaczego?",
    answer: `Drzewo decyzyjne to hierarchiczna struktura danych. Drzewo jest metodą reprezentacji wiedzy. Zapisuje wiedzę w postaci hierarchicznych reguł if-then, gdzie:
● węzły wewnętrzne reprezentują testy na atrybutach,
● gałęzie odpowiadają wynikom tych testów,
● liście przechowują decyzje lub klasyfikacje.
Każda ścieżka od korzenia do liścia odpowiada jednej regule wnioskowania. Struktura jest czytelna i interpretowalana przez człowieka. Drzewo może być budowane ręcznie przez eksperta lub automatycznie z danych (algorytmy ID3, C4.5, CART), co czyni je narzędziem zarówno reprezentacji, jak i pozyskiwania wiedzy.`
  },
  {
    id: 39,
    question: "Jakie widzisz współczesne zastosowania algorytmów mrówkowych?",
    answer: `Algorytmy mrówkowe (Ant Colony Optimization - ACO) są to algorytme optymalizacyjne oparte na działaniu intuicyjnym.
Działają na zasadzie stygmergii - mrówki komunikują się pośrednio przez środowisko, odkładając wirtualne feromony na ścieżkach. Krótsze trasy są przemierzane częściej, więc feromon odparowuje na nich wolniej, co wzmacnia ich wybór przez kolejne mrówki i prowadzi do zbieżności do optymalnego rozwiązania. Zastosowania:
● optymalizacja tras - problem komiwojażera (TSP), planowanie dostaw;
● sieci komputerowe - dynamiczny routing danych;
● harmonogramowanie zadań - przydział zasobów;
● robotyka - koordynacja rojów robotów.`
  },
  {
    id: 40,
    question: "Zasady definiujące model danych rozumiany jako architektura BD.",
    answer: `Model danych jako architektura BD to zestaw reguł, struktur i więzów definiujących sposób przechowywania, organizacji i przetwarzania danych w systemie informatycznym.
Centralną koncepcją jest architektura ANSI/SPARC, która wyróżnia trzy poziomy abstrakcji:
● koncepcyjny - wysokopoziomowy widok encji i relacji, niezależny od technologii;
● logiczny - struktura danych bez powiązania z implementacją (tabele, atrybuty, klucze, ERD);
● fizyczny - sposób faktycznego składowania danych (indeksy, partycjonowanie).

Kluczowe zasady definiujące model:
● definicja struktury - typy danych, klucze główne i obce, więzy integralności;
● operowanie danymi - reguły manipulacji danymi (DDL, DML);
● integralność i spójność - więzy klucza obcego, zasady ACID;
● niezależność danych - zmiany na poziomie fizycznym nie wpływają na poziom logiczny i
odwrotnie.`
  },
  {
    id: 41,
    question: "Typy architektonicznych modeli danych.",
    answer: `Architektoniczne modele danych określają sposób organizacji i powiązań danych w bazie danych.
Wyróżnia się:
● model hierarchiczny - dane zorganizowane w strukturę drzewa, relacje rodzic-dziecko, brak obsługi relacji wiele-do-wielu,
● model sieciowy - rozszerzenie hierarchicznego, węzły mogą mieć wielu rodziców, obsługuje relacje wiele-do-wielu,
● model relacyjny - dane przechowywane w tabelach powiązanych kluczami, podstawa SQL, najpowszechniejszy,
● model obiektowy - dane przechowywane jako obiekty z atrybutami i metodami, bliski paradygmatowi OOP,
● model obiektowo-relacyjny - hybryd relacyjnego i obiektowego, rozszerza SQL o typy obiektowe,
● modele NoSQL - dokumentowe (JSON), klucz-wartość, kolumnowe, grafowe - stosowane przy danych nieustrukturyzowanych i dużej skali.`
  },
  {
    id: 42,
    question: "Trójpoziomowa architektura SBD.",
    answer: `Trójpoziomowa architektura SBD (standard ANSI/SPARC) dzieli system baz danych na trzy poziomy abstrakcji:
● zewnętrzny - widoki danych dla poszczególnych użytkowników lub aplikacji, każdy widzi tylko fragment bazy który go dotyczy,
● konceptualny - pełna logiczna struktura całej bazy danych, niezależna od implementacji,
● fizyczny - sposób faktycznego przechowywania danych na nośniku (indeksy, pliki, partycjonowanie).
Poziomy są połączone odwzorowaniami (mapowaniami), które tłumaczą dane między warstwami.

Architektura zapewnia dwa rodzaje niezależności danych:
● fizyczną - zmiany na poziomie fizycznym nie wpływają na konceptualny,
● logiczną - zmiany na poziomie konceptualnym nie wpływają na widoki zewnętrzne.`
  },
  {
    id: 43,
    question: "Istota relacyjnego modelu danych.",
    answer: `Relacyjny model danych opiera się na matematycznych podstawach teorii zbiorów i algebry relacyjnej. Dane przechowywane są w relacjach (tabelach) - formalnych zbiorach krotek (wierszy) o określonych atrybutach (kolumnach).
Kluczowe elementy modelu:
● klucz główny - jednoznacznie identyfikuje każdy wiersz w tabeli;
● klucz obcy - atrybut odwołujący się do klucza głównego innej tabeli, realizuje powiązania między tabelami;
● więzy integralności, czyli zasady dotyczące wierszy:
  ◌ integralność wiersza - klucz główny nie może być NULL,
  ◌ referencyjność - klucz obcy musi wskazywać na istniejącą krotkę,
  ◌ dziedzina - wartości atrybutów muszą należeć do określonej dziedziny;
● algebra relacyjna - formalna podstawa operacji na danych: selekcja, projekcja, złączenie, suma, różnica.
Model relacyjny jest obecnie najpowszechniej stosowanym modelem baz danych, realizowanym przez systemy takie jak PostgreSQL czy MySQL.`
  },
  {
    id: 44,
    question: "Elementy i funkcje jądra systemu zarządzania BD.",
    answer: `Jądro systemu zarządzania bazą danych odpowiada za wszystkie podstawowe operacje na danych. Jego główne elementy i funkcje to:
● procesor zapytań - przetwarza zapytania w trzech etapach: analiza składni, optymalizator, wykonanie planu;
● menedżer pamięci - zarządza pamięcią podręczną, minimalizuje odczyty z dysku;
● menedżer plików - odpowiada za fizyczny dostęp do danych na nośniku;
● menedżer transakcji - zarządza zatwierdzaniem i wycofywaniem transakcji;
● menedżer współbieżności - kontroluje równoczesny dostęp wielu użytkowników, zapobiega konfliktom;
● menedżer blokad - na potrzeby kontroli współbieżności realizuje mechanizm blokowania do zasobów;
● menedżer odzyskiwania - przywraca spójny stan bazy po awarii.`
  },
  {
    id: 45,
    question: "Charakterystyka tzw. metody blokowania, zapewniającej współbieżne wykonywanie transakcji w BD",
    answer: `Metoda blokowania w bazach danych polega na kontrolowaniu dostępu do danych poprzez przydzielanie blokad transakcjom - co zapobiega konfliktom przy współbieżnym wykonaniu.
Blokady są:
● współdzielone - odczyt - wiele transakcji może je otrzymać jednocześnie;
● wyłączne - modyfikacja - blokuje dostęp innym transakcjom.
Szczegółowość blokad obejmuje poziom wiersza, strony lub tabeli. Im bardziej szczegółowa blokada tym większa współbieżność, ale i większy narzut systemowy.
Protokół dwufazowy zapewnia szeregowość i składa się z fazy rosnącej (pobieranie blokad) i malejącej (zwalnianie blokad).
Istnieje ryzyko zakleszczenia, kiedy transakcje czekają wzajemnie na zwolnienie blokad. Zakleszczenia wykrywa się grafem i rozwiązuje wycofując jedną z transakcji.`
  },
  {
    id: 46,
    question: "Wymień i scharakteryzuj diagramy UML opisujące strukturę systemu informatycznego.",
    answer: `Diagramy strukturalne UML opisują statyczną budowę systemu. Wyróżnia się:
● diagram komponentów - przedstawia fizyczne elementy systemu (biblioteki, pliki, moduły) i zależności między nimi;
● diagram pakietów - grupuje elementy modelu w pakiety i zależności między nimi;
● diagram klas - przedstawia klasy, ich atrybuty, metody oraz relacje - podstawowy diagram strukturalny;
● diagram obiektów - diagram konkretnych instancji klas w danym momencie działania systemu;
● diagram wdrożenia - opisuje fizyczne rozmieszczenie komponentów na sprzęcie (serwery, urządzenia);
● diagram struktur złożonych - przedstawia wewnętrzną strukturę zaawansowanych klas lub komponentów.`
  },
  {
    id: 47,
    question: "Wymień i scharakteryzuj diagramy UML opisujące zachowanie systemu informatycznego.",
    answer: `Diagramy behawioralne UML opisują dynamiczne zachowanie systemu i interakcje między jego elementami. Wyróżnia się:
● diagram komunikacji - akcentuje powiązania między obiektami zamiast kolejności czasowej;
● diagram aktywności - modeluje przepływ sterowania i przepływ danych w procesach;
● diagram przypadków użycia - przedstawia funkcjonalności systemu z perspektywy aktorów;
● diagram stanów - opisuje cykl życia obiektu poprzez stany i przejścia między nimi na skutek wywołanych zdarzeń;
● diagram sekwencji - przedstawia kolejność komunikatów wymienianych między obiektami w czasie;
● diagram przeglądu interakcji - łączy diagramy sekwencji w ogólny przepływ sterowania.`
  },
  {
    id: 48,
    question: "Omów diagramy przypadków użycia z języka UML.",
    answer: `Diagram przypadków użycia przedstawia funkcjonalności aplikacji z perspektywy użytkowników.
Składa się z:
● aktorów - zewnętrzny użytkownik lub system wchodzący w interakcję z aplikacją;
● przypadków użycia - konkretna funkcjonalność realizowana przez aplikację na rzecz aktora;
● granicy aplikacji - oddziela aplikację od aktorów.

W ramach diagramu zachodzą określone relacje między elementami:
● połączenie aktora z przypadkiem użycia - asocjacja;
● przypadek użycia obowiązkowo wywołuje inny element- include;
● przypadek użycia opcjonalnie rozszerza inny w określonych warunkach - extend;
● dziedziczenie aktorów - aktor potomny przejmuje relacje aktora nadrzędnego.
Diagram przypadków użycia jest stosowany na etapie analizy wymaga. Jego zadanie to czytelne przedstawienie projektu dla klienta, stanowiące podstawę do dalszego projektowania systemu.`
  },
  {
    id: 49,
    question: "Omów rodzaje testów w procesie wytwórczym systemu informatycznego.",
    answer: `W procesie wytwórczym wyróżnia się rodzaje testów, które odpowiadają kolejnym etapom modelu V:
● jednostkowe - testowanie pojedynczych funkcji, klas czy endpointów w izolacji, wykonywane przez programistów;
● integracyjne - sprawdzanie poprawności współpracy między modułami po ich połączeniu;
● systemowe - testowanie całego systemu jako całości pod kątem zgodności z wymaganiami;
● akceptacyjne (UAT) - weryfikacja przez klienta lub użytkownika końcowego czy system spełnia wymagania biznesowe.

Dodatkowo stosuje się:
● regresyjne - sprawdzanie czy nowe zmiany nie zepsuły istniejącej funkcjonalności,
● wydajnościowe - ocena zachowania systemu pod obciążeniem (load testing, stress testing),
● bezpieczeństwa - wykrywanie podatności i luk w zabezpieczeniach.

Testy dzieli się także ze względu na dostęp do kodu:
● białej skrzynki - tester zna implementację, testuje ścieżki kodu,
● czarnej skrzynki - tester testuje interfejs bez znajomości implementacji.`
  },
  {
    id: 50,
    question: "Omów trzy różne modele cyklu życia systemu informatycznego.",
    answer: `Modele cyklu życia systemu informatycznego opisują sposób organizacji procesu wytwórczego. Trzy podstawowe to:

● Model kaskadowy - liniowy, sekwencyjny - każda faza (wymagania -> projekt -> implementacja -> testowanie -> wdrożenie) musi zostać ukończona przed rozpoczęciem kolejnej.
Zalety: prosty, dobrze udokumentowany.
Wady: brak elastyczności, błędy wykryte późno są kosztowne w naprawie, klient widzi produkt dopiero na końcu.

● Model iteracyjno-przyrostowy - system budowany jest w kolejnych iteracjach - każda dostarcza działający fragment systemu. Klient może weryfikować postęp i zgłaszać zmiany między iteracjami.
Zalety: elastyczność, wczesna dostawa częściowego produktu.
Wady: wymaga dobrego zarządzania zakresem.

● Model spiralny - łączy podejście iteracyjne z analizą ryzyka. Każda pętla spirali składa się z czterech faz: planowanie, analiza ryzyka, wytwarzanie, ewaluacja. Stosowany przy dużych i złożonych projektach gdzie ryzyko jest wysokie.
Wady: kosztowny i trudny w zarządzaniu.

Dodatkowo warto wymienić model V - rozszerzenie kaskadowego, gdzie każdemu etapowi
wytwórczemu odpowiada poziom testowania`
  },
  {
    id: 51,
    question: "Charakterystyka co najmniej trzech elementów niezbędnych do budowy systemu wbudowanego.",
    answer: `System wbudowany to specjalizowany system komputerowy realizujący dedykowane zadania, zazwyczaj w warunkach ograniczonych zasobów.
Niezbędne elementy to:
● mikroprocesor lub mikrokontroler - jednostka obliczeniowa wykonująca program; mikrokontroler integruje dodatkowo pamięć i peryferia na jednym układzie;
● pamięć - ROM/Flash przechowuje kod programu i stałe dane, RAM przechowuje dane robocze i stos; zasoby są znacząco ograniczone w porównaniu do systemów ogólnego przeznaczenia;
● interfejsy I/O - umożliwiają komunikację z otoczeniem, a także łączą system z urządzeniami zewnętrznymi np. czujnikami;
● czujniki i elementy wykonawcze (aktuatory) - czujniki dostarczają danych z otoczenia (np. temperatura, ciśnienie), aktuatory wykonują działania fizyczne (siłowniki, silniki, zawory);
● Real-Time Operating System (RTOS) - w złożonych systemach zarządza zadaniami z gwarancją czasową; zapewnia przewidywalne wykonanie krytycznych operacji.`
  },
  {
    id: 52,
    question: "Charakterystyka trzech elementów mikrokontrolera.",
    answer: `Mikrokontroler to układ scalony integrujący na jednym chipie wszystkie elementy niezbędne do sterowania urządzeniem. Trzy kluczowe elementy to:
● CPU (jednostka centralna) - wykonuje instrukcje programu, zarządza pracą pozostałych bloków, obsługuje przerwania - mechanizm natychmiastowej reakcji na zdarzenia zewnętrzne i wewnętrzne bez ciągłego odpytywania;
● pamięć - RAM przechowuje dane robocze i stos (ulotna), Flash przechowuje kod programu (nieulotna), EEPROM przechowuje dane trwałe zapisywane w trakcie konfiguracji;
● interfejsy I/O i peryferia:
  ◌ GPIO (cyfrowe wejścia/wyjścia),
  ◌ interfejsy komunikacyjne (UART, SPI, I2C),
  ◌ timery/liczniki (PWM, odmierzanie czasu),
  ◌ przetwornik ADC (konwersja sygnałów analogowych na cyfrowe).`
  },
  {
    id: 53,
    question: "Zasadnicze różnice i podobieństwa występujące między mikroprocesorem, a mikrokontrolerem.",
    answer: `Zarówno mikroprocesor i mikrokontroler to centralne jednostki układów elektronicznych. Obie jednostki mają procesor, są programowalne, dostosowane do pracy z urządzeniami zewnętrznymi oraz sterowania nimi.
Różnice:
Mikroprocesor służy przede wszystkim do wykonywania zaawansowanych obliczeń. Wymaga on zewnętrznych układów pamięci i peryferiów. Sprawdzi się on w smartfonach, czy komputerach osobistych.
Mikrokontroler ma zintegrowane moduły pamięci RAM, flash oraz wybrane peryferia. Jest dedykowany do prostych, zintegrowanych zadań, np. obsługa pralki czy pilot TV.`
  },
  {
    id: 54,
    question: "Konsekwencje stosowania systemów operacyjnych w systemach wbudowanych.",
    answer: `Stosowanie systemu operacyjnego w systemie wbudowanym ma następujące konsekwencje:

Korzyści:
● wielozadaniowość - możliwość równoczesnego wykonywania wielu zadań według priorytetów;
● przewidywalność - gwarancja, że krytyczne zadania zostaną wykonane w ściśle określonym czasie, co jest niezbędne w systemach czasu rzeczywistego;
● abstrakcja sprzętu - programista operuje na API systemu zamiast bezpośrednio na rejestrach sprzętu;
● lepsza organizacja kodu - podział na niezależne zadania ułatwia rozwój i utrzymanie systemu.

Wady:
● narzut pamięciowy - OS zajmuje część ograniczonej pamięci Flash i RAM;
● narzut czasowy - przełączanie kontekstu między zadaniami ma koszt obliczeniowy;
● wzrost złożoności - konieczność zarządzania synchronizacją zadań, unikania zakleszczeń i wyścigów;
● zużycie energii - dodatkowe procesy OS zwiększają pobór prądu, co jest istotne w urządzeniach bateryjnych.`
  },
  {
    id: 55,
    question: "Znaczenie terminów: OTP, programowanie w systemie, bootloader.",
    answer: `OTP, programowanie w systemie, bootloader
OTP (One-Time Programmable) - rodzaj nieulotnej pamięci, którą można zaprogramować tylko raz; stosowana tam gdzie kod lub dane muszą być niezmienne i zabezpieczone przed modyfikacją (klucze kryptograficzne, firmware produkcyjny).
Programowanie w systemie (In-System Programming) - programowanie mikrokontrolera bez wyjmowania go z płytki docelowej, przez dedykowany interfejs; wymaga sprzętowego interfejsu debugowania lub obecności bootloadera.
Bootloader - mały program umieszczony w chronionym obszarze pamięci Flash, uruchamiany jako pierwszy po resecie; jego główną rolą w systemach wbudowanych jest umożliwienie aktualizacji firmware przez interfejs komunikacyjny - bez zewnętrznego programatora; w systemach desktopowych (np. GRUB) odpowiada za wybór i załadowanie systemu operacyjnego.`
  },
  {
    id: 56,
    question: "Społeczeństwo informacyjne.",
    answer: `Społeczeństwo informacyjne - informacja i technologie jej przetwarzania stanowią kluczowy zasób gospodarczy i społeczny. Cechy charakterystyczne:
● cyfryzacja - większość procesów gospodarczych, społecznych i kulturowych odbywa się z udziałem technologii cyfrowych;
● gospodarka jest oparta na wiedzy - informacja staje się towarem i czynnikiem produkcji, dominują sektory usług i technologii;
● globalny przepływ informacji - Internet znosi bariery geograficzne w dostępie do danych;
● kompetencje cyfrowe - umiejętność korzystania z technologii staje się podstawową kompetencją obywatelską.
Zagrożenia związane z życiem w społeczeństwie informacyjnym to: wykluczenie cyfrowe, dezinformacja oraz prywatność i bezpieczeństwo danych.`
  },
  {
    id: 57,
    question: "Etyka w informatyce.",
    answer: `Etyka w informatyce zajmuje się moralnymi aspektami tworzenia i stosowania systemów komputerowych. Główne obszary to:
● prywatność i ochrona danych - prawo do kontroli nad własnymi danymi, problem masowej inwigilacji przez korporacje i rządy, regulacje prywatności np. RODO;
● własność intelektualna - prawa autorskie do oprogramowania, licencjonowanie, open source kontra oprogramowanie własnościowe;
● bezpieczeństwo - odpowiedzialność twórców za luki w systemach i konsekwencje ich błędów dla użytkowników;
● odpowiedzialność zawodowa - kto ponosi odpowiedzialność, kiedy system zawiedzie i spowoduje szkodę;
● kodeksy etyczne które regulują zachowanie informatyków - ACM Code of Ethics nakłada obowiązek działania w interesie publicznym, uczciwości, ochrony prywatności i zgłaszania zagrożeń, a IEEE Code of Ethics kładzie nacisk na bezpieczeństwo i rzetelność techniczną;
● sztuczna inteligencja - stronniczość algorytmów, autonomiczne podejmowanie decyzji, odpowiedzialność za działania systemów AI;
● wykluczenie cyfrowe - nierówny dostęp do technologii pogłębia nierówności społeczne;
● dezinformacja - rola platform internetowych w rozprzestrzenianiu fałszywych informacji i odpowiedzialność za treści.`
  },
  {
    id: 58,
    question: "Odpowiedzialność zawodowa informatyków.",
    answer: `Odpowiedzialność zawodowa informatyków obejmuje trzy wymiary:
● prawny - zgodność oprogramowania z przepisami (RODO, prawo autorskie, prawo zamówień publicznych). Informatyk może ponosić odpowiedzialność cywilną lub karną za błędy powodujące szkody;
● etyczny - postępowanie zgodne z kodeksami zawodowymi - (ACM Code of Ethics nakłada obowiązek działania w interesie publicznym, uczciwości, ochrony prywatności i zgłaszania zagrożeń, IEEE Code of Ethics kładzie nacisk na bezpieczeństwo i rzetelność techniczną);
● zawodowy - jakość wytwarzanych systemów, dokumentacji i procesu wytwórczego;
● odpowiedzialność za testowanie, utrzymanie i bezpieczeństwo kodu.
Szczególne obszary odpowiedzialności to systemy krytyczne (oprogramowania medyczne, lotnicze czy energetyczne); ochrona danych oraz systemy AI, gdzie problemem jest wnioskowanie odpowiedzialnego za decyzję podejmowaną przez algorytm.`
  },
  {
    id: 59,
    question: "Ochrona własności intelektualnej w informatyce.",
    answer: `Ochrona własności intelektualnej w informatyce obejmuje mechanizmy prawne chroniące oprogramowanie, algorytmy i inne wytwory cyfrowe.
Ochrona obejmuje:
● prawo autorskie - chroni kod źródłowy jako utwór automatycznie od momentu powstania, nie wymaga rejestracji; nie chroni jednak idei ani algorytmów;
● patenty - chronią rozwiązania techniczne; algorytmy same w sobie są w większości jurysdykcji niepatentowalne;
● znaki towarowe - chronią nazwy i logotypy produktów i firm;
● tajemnica przedsiębiorstwa - ochrona poufnych informacji handlowych i technicznych poprzez umowy NDA.
Kluczową rolę odgrywają licencje, które określają zasady korzystania z oprogramowania. Ich rodzaje to licencje własnościowe, open source oraz copyleft (GPL).`
  },
  {
    id: 60,
    question: "Ochrona prywatności użytkowników technologii informacyjnych.",
    answer: `Ochrona prywatności użytkowników technologii informacyjnych polega na zabezpieczaniu danych osobowych przed nieuprawnionym dostępem i niewłaściwym wykorzystaniem. Ochrona obejmuje metody techniczne oraz regulacje prawne.

Metody techniczne:
● szyfrowanie;
● anonimizacja - nieodwracalne usunięcie możliwości identyfikacji osoby;
● pseudonimizacja - zastąpienie danych z możliwością odwrócenia procesu.

RODO, jako regulacje prawne wprowadzają zasady:
● minimalizacji danych;
● transparentności gromadzenia i celowości;
● zgody użytkownika;
● prawa do bycia zapomnianym - możliwość zażądania usunięcia danych.

Rzeczywiste zagrożenia prywatności to śledzenie przez pliki cookies, systemy analityczne, czy profilowanie użytkownika na podstawie zbieranych danych.`
  },
  {
    id: 61,
    question: "Ryzyko związane z projektami informatycznymi.",
    answer: `Ryzyko w projektach informatycznych to możliwość wystąpienia zdarzeń negatywnie wpływających na zakres, czas, koszt lub jakość projektu. Kategorie ryzyka:
● techniczne - nieznane technologie, błędy architektoniczne, problemy z integracją;
● organizacyjne - zmiany wymagań, niejasny zakres projektu, brak wsparcia kierownictwa;
● ludzkie - rotacja zespołu, brak kompetencji, konflikty;
● biznesowe - zmiany priorytetów, brak finansowania, zmiana otoczenia rynkowego;
● bezpieczeństwa - podatności, wycieki danych, ataki.
Aby skutecznie zarządzać ryzykiem należy: przeprowadzić identyfikację; wykonać analizę prawdopodobieństwa i wpływu; zaplanować reakcję na ryzyko i sposób redukcji ryzyka, a także stale monitorować rejestr ryzyka.`
  },
  {
    id: 62,
    question: "Szkoła w dobie nowoczesnych technologii informacyjnych.",
    answer: `Szkoła w dobie nowoczesnych technologii informacyjnych korzysta z wielu narzędzi i możliwości.
Dzięki platformom nauczania online (Teams, Moodle), uczniowie mogą korzystać z nauki zdalnej, niezależnie od miejsca.
Często wykorzystuje się również multimedia i metody aktywizacji, aby zwiększyć zaangażowanie uczniów i spersonalizować doświadczenia - tutaj wspierać może dostęp do narzędzi sztucznej inteligencji.
Niestety poza szansami, technologie wiążą się również z wyzwaniami: wykluczenie cyfrowe, poprawność i jakość informacji, a także uzależnienie od technologii to główne kwestie z jakimi musi mierzyć się w tym zakresie szkoła.
Rola nauczyciela ewoluuje od przekaziciela wiedzy w kierunku przewodnika rozwijającego kompetencje uczenia się, krytycznego myślenia oraz kompetencje miękkie.`
  },
  {
    id: 63,
    question: "Komputery kwantowe - przyszłość informatyki.",
    answer: `Komputery kwantowe to urządzenia obliczeniowe wykorzystujące zjawiska mechaniki kwantowej zamiast klasycznej bazującej na bitach.
Korzystają zamiast nich z kubitów, które mogą znajdować się jednocześnie w stanie 0 i 1 (superpozycja) oraz mogą przyjmować dowolny stan pośredni.
Kubity mogą być połączone w taki sposób że stan jednego natychmiast zmienia stan drugiego, niezależnie od odległości (splątanie kwantowe).
Kluczowe algorytmy kwantowe pozwalają na np. faktoryzacja dużych liczb w czasie wielomianowym, czy przeszukiwanie nieposortowanych baz danych z kwadratowym przyspieszeniem.
Komputery kwantowe nie są uniwersalnie szybsze - oferują przewagę dla określonej, nie zbyt dużej klasy problemów. Dla większości zadań klasyczne komputery pozostają efektywniejsze oraz bardziej opłacalne.

Główne ograniczenia techniczne komputerów kwantowych:
● podatność na jakiekolwiek zakłócenia zewnętrze - kubity tracą stan kwantowy - najlepiej operują w temp. bliskiej zera bezwzględnego;
● korekcja błędów - wymaga dużej liczby fizycznych kubitów na jeden logiczny;
● trudność z utrzymaniem wielu stabilnych kubitów.`
  },
  {
    id: 64,
    question: "Autonomiczne systemy w środowisku społecznym.",
    answer: `Autonomiczne systemy są zdolne do samodzielnego podejmowania decyzji i działania bez ciągłej kontroli człowieka - wykorzystują AI, uczenie maszynowe i percepcję środowiska.

Przykłady zastosowań społecznych to:
● pojazdy autonomiczne - drony dostawcze czy samochody ze skalą autonomii;
● roboty społeczne - asystenci w opiece nad osobami starszymi, edukacji;
● systemy decyzyjne - algorytmy rekrutacyjne, systemy oceny kredytowej, moderacja treści;
● medycyna - autonomiczna diagnostyka obrazowa, systemy wspomagania chirurgii.

Poza możliwościami autonomiczne systemy wiążą się też z wieloma wyzwaniami. Najważniejsze z nich to: odpowiedzialność prawna; wyjaśnialność (systemy oparte na głębokim uczeniu działają jak czarna skrzynka, co utrudnia weryfikację i rozliczalność); stronniczość algorytmów (nauka np. na danych historycznych); bezpieczeństwo; nadmierne zaufanie.`
  },
  {
    id: 65,
    question: "Internet rzeczy - zagrożenia i szanse.",
    answer: `Internet rzeczy (IoT) to sieć fizycznych urządzeń wyposażonych w sensory, oprogramowanie i łączność sieciową, które zbierają i wymieniają dane. Architektura IoT obejmuje warstwę urządzeń, bramę (gateway) i chmurę; komunikacja odbywa się przez dedykowane protokoły.

Szanse:
● inteligentne miasta - zarządzanie ruchem, oświetleniem, odpadami;
● przemysł - monitorowanie maszyn, predykcyjne utrzymanie ruchu;
● opieka zdrowotna - zdalne monitorowanie pacjentów, urządzenia noszone;
● automatyzacja domu - smart home, zarządzanie energią.

Zagrożenia:
● bezpieczeństwo - urządzenia IoT często mają słabe zabezpieczenia i bywają przejmowane do ataków - botnet Mirai (2016) wykorzystał miliony kamer i routerów do przeprowadzenia największego wówczas ataku DDoS;
● prywatność - masowe zbieranie danych o zachowaniu użytkowników w czasie rzeczywistym;
● brak standardów - fragmentacja protokołów i brak jednolitych standardów bezpieczeństwa utrudnia interoperacyjność;
● skalowalność - zarządzanie dziesiątkami miliardów urządzeń generuje wyzwania infrastrukturalne.

Edge computing - przetwarzanie danych blisko źródła, na urządzeniu lub bramie zamiast w chmurze jest odpowiedzią na problemy latencji i przepustowości w IoT.`
  },
  {
    id: 66,
    question: "Jak zachować w sieci swoją autonomię?",
    answer: `Autonomia to zdolność do samodzielnego działania i podejmowania decyzji. W kontekście technologii, oznacza zachowanie kontroli nad: swoimi danymi; komunikacją; używanym oprogramowaniem; dostępem do informacji; zależnością od platform i dostawców usług.
Podstawowe sposoby zachowania autonomii to m.in.:
● ochrona prywatności i danych - poprzez stosowanie silnych haseł, uwierzytelnianie wieloskładnikowe, ograniczanie ilości publikowanych danych osobowych;
● świadome korzystanie z usług internetowych - czytanie polityk prywatności, kontrolowanie uprawnień aplikacji, dywersyfikacja dostawców usług;
● korzystanie z otwartych standardów i oprogramowania open source - umożliwia to kontrolę oraz zmniejsza zależność od zamkniętych ekosystemów;
● komunikowanie się w bezpieczny sposób, używając szyfrowania, np. HTTPS czy szyfrowania end-to-end;
● aktualizowanie wiedzy oraz dobrych praktyk, mając świadomość zagrożeń.`
  },
  {
    id: 67,
    question: "Licencje oprogramowania w aspekcie nowoczesnych architektur aplikacji.",
    answer: `Licencja oprogramowania określa zasady użytkowania, modyfikacji i dystrybucji aplikacji. W nowoczesnej architekturze, np. systemów chmurowych, mikroserwisów, czy aplikacji SaaS, licencje mają istotny wpływ na sposób integracji komponentów i dystrybucji oprogramowania.
Podstawowe rodzaje licencji to:
● licencje własnościowe. Kod źródłowy jest zamknięty, a użytkownik ma prawa użycia zgodne z umową producenta.
● licencje open source. Pozwalają na dostęp do kodu źródłowego i jego modyfikację. Wyróżnia się licencje:
  ◌ permisywne, które pozwalają na szerokie wykorzystanie kodu (MIT, Apache);
  ◌ copyleft, które wymagają udostępnienia kodu pochodnego na tej samej licencji (GPL).`
  },
];
