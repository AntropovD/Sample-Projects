#include <iostream>			
#include <conio.h>
#include <windows.h>
#include <string>
#include <stdio.h>
#include <stdlib.h>
#include <vector>


using namespace std;

int SCREENX;
int SCREENY;

int oldSCREENX=SCREENX;
int oldSCREENY=SCREENY;

HANDLE stdo;
CONSOLE_CURSOR_INFO CursorInfo;

// Получить управление консолью
// Задать нужный размер консоли

void InitConsole()
{
	SMALL_RECT rc = {0, 0, SCREENX, SCREENY};
	stdo = GetStdHandle(STD_OUTPUT_HANDLE);
	SetConsoleWindowInfo(stdo, TRUE, &rc);
	GetConsoleCursorInfo(stdo, &CursorInfo);
}

// Преобразовать координаты в тип COORD
COORD ToCoord(int x, int y)
{
	COORD c = {x, y};
	return c;
}

// Вывести в нужном месте экрана строку
void WriteAt(COORD pos, char* s)
{
	SetConsoleCursorPosition(stdo, pos);
	cout << s;
}

// Вывести в нужном месте экрана string
void WriteAt(COORD pos, string a)
{
	SetConsoleCursorPosition(stdo, pos);
	cout << a;
}

// Вывести в нужном месте экрана символ
void WriteAt(COORD pos, char a)
{
	SetConsoleCursorPosition(stdo, pos);
	cout << a;
}

// Показать или скрыть курсор
void ShowCursor(bool visible)
{
	CursorInfo.bVisible = visible;
	SetConsoleCursorInfo(stdo, &CursorInfo);
}
	
void GetConsoleSize()
{
    HANDLE hWndConsole = GetStdHandle(-12);    
    CONSOLE_SCREEN_BUFFER_INFO consoleInfo;
    GetConsoleScreenBufferInfo(hWndConsole, &consoleInfo);
    SCREENX = consoleInfo.srWindow.Right - consoleInfo.srWindow.Left + 1;
    SCREENY = consoleInfo.srWindow.Bottom - consoleInfo.srWindow.Top + 1;
}

string buffer;
int current = 0;
COORD position;
//char  = buffer;
vector<int> listOfEndl;	// список ендлов
vector<int> lineLength; 
int currentString = 0;
bool isAlreadyExist = false; // Сущ-т ли файл
char *name; // filename
FILE *pFile;

void getLineLengths()
{
	lineLength.clear();
	if ( !listOfEndl.empty() )
		lineLength.push_back(listOfEndl[0]);
	for (unsigned int i=1; i<listOfEndl.size(); ++i)
		lineLength.push_back(listOfEndl[i] - listOfEndl[i - 1] - 1);
	if (buffer.back() != '\n' )
	{
		if (listOfEndl.empty())
				lineLength.push_back(buffer.length());
		else
			lineLength.push_back(buffer.length() - listOfEndl[listOfEndl.size()-1] - 1);
	}
	else 
		lineLength.push_back(buffer.length() - listOfEndl[listOfEndl.size()-1] - 1);
 }

void updateListOfEndl()
{
	listOfEndl.clear();
	for (unsigned int i=0; i<buffer.length(); ++i)
		if (buffer[i] == '\n') 
			listOfEndl.push_back(i);
	getLineLengths();
}

void clearFirstLine()
{
	SetConsoleCursorPosition(stdo, ToCoord(0, 0));
	for (int i=0; i<SCREENX; ++i)
		cout<<" ";
	return ;
}

void conditionPanel()
{	
	SetConsoleCursorPosition(stdo, ToCoord(0, 0));
	//for (int i=0; i<SCREENX; ++i)
	//	cout<<" ";
	//SetConsoleCursorPosition(stdo, ToCoord(0, 0));
	cout<<"position "<<position.Y-1<<" "<<position.X<<" | current"<<current<<" |curSTR"<<currentString<<" "<<SCREENX<<" "<<SCREENY;
	SetConsoleCursorPosition(stdo, position);
}

bool FileExists(char fullpath[]) 
{
	FILE *file = fopen(fullpath, "r");
	if (file == NULL) return false;
	else 
	{
		fclose(file);
		return true;
	}
}


void savePanel()
{
	char c;
	clearFirstLine();
	do {
		SetConsoleCursorPosition(stdo, ToCoord(0, 0));
		printf("Save file??? Y or N:");
		c = getche();
	} while (c != 'Y' && c!='N');
	if (c=='N') return;
	if (c=='Y')
	{		
		if (isAlreadyExist)
		{
			pFile = fopen(name, "w");
			for (unsigned int i=0; i<buffer.size(); i++)
				fputc(buffer.at(i), pFile);
			fclose(pFile);			
		}
		else
		{
			char name[256];
			clearFirstLine();
			SetConsoleCursorPosition(stdo, ToCoord(0, 0));
			printf("Enter filename:");
			scanf("%s", name);
		
			while (FileExists(name))
			{
				clearFirstLine();
				SetConsoleCursorPosition(stdo, ToCoord(0, 0));
				printf("Such file already Exist. Choose Another:");
				scanf("%s", name);
			}			
						
			pFile = fopen(name, "w");

			for (unsigned int i=0; i<buffer.size(); i++)
				fputc(buffer.at(i), pFile);
			fclose(pFile);			
		}	
		return ;
	}
}


int main(int argc, char **argv)
{		

	if 	(argc>2)
	{
		printf("Read help. Use %s help", argv[0]);
		return 0;
	}
	if (argc==2)
	{
		char *prog = argv[0];
		name = argv[1];		
		if (!strcmp(name, "help"))
		{
			printf("Simple text editor\n");
			printf("To edit file use: %s filename\n", prog);
			printf("To edit a new file use: %s\n", prog);
			printf("To exit use Alt+F4 or ESC or CTRL-C\n");
			printf("String number is limited by size of Screen Buffer\n");
			printf("There are no Easter Eggs in this program");
			return 0;
		}
		if (!strcmp(name, "moo"))
		{
			 printf("___________________________\n");
			 printf("< Please, give me AUTOMAT! >\n");
			 printf("---------------------------\n");
		     printf("   \\   ^__^\n");
			 printf("    \\  (oo)\\_______ \n");
             printf("       (__)\\       )\\\/\\ \n");
             printf("           ||---- w| \n");
             printf("           ||     || \n");
			 return 0;			
		}
		pFile = fopen(name, "r");
		if (pFile==NULL)
		{
			puts("Error! No such File\n");
			return 0;
		}
		else
		{	
			isAlreadyExist = true;
		}
	}
		
	
	GetConsoleSize();
	InitConsole();

	//system("color 0a");  // Turn on MATRiX
	system("cls");	
	position = ToCoord(0,1);
	
	SetConsoleCursorPosition(stdo, position);
	if (isAlreadyExist)
	{
		char c;
		do {
			c = fgetc (pFile);
			buffer.push_back(c);
			cout<<c;
			current++;
			position.X++;
			if (c == '\n')
			{
				position.X=0;
				position.Y++;
				currentString++;
			}		
		} while (c != EOF);
		fclose(pFile);
	}

	SetConsoleCursorPosition(stdo, position);
		
	bool flag = TRUE;
	while (flag)
	{		

		/***** DDDDDDDDDEBUG!!!!!!!! **/
		SetConsoleCursorPosition(stdo, ToCoord(0, 10));
	cout<<"\n################################\n";
	updateListOfEndl();
		
	cout<<buffer;
	cout<<"\nStrings Length \n";
	for (int i=0; i<lineLength.size(); ++i)
		cout<<lineLength[i]<<endl;
	cout<<"#############\n";
/*******/

		/*GetConsoleSize(); 
		if (SCREENX!=oldSCREENX || SCREENY!=oldSCREENY)
			redraw();
	    InitConsole();*/
		
		updateListOfEndl();

		conditionPanel();
		int c=getch();
		int key=int(c);

		if (key == 3 || key == 4 || key == 27) flag=FALSE;
		
		if (key == 224)
		{
			key = getch();
			if (key == 77)//==>
			{
				if (current != buffer.length())
				{					
					if (position.X != lineLength[currentString])
						++position.X;
					else
					{
						position.X=0;
						position.Y++;
						currentString++;
					}
					++current;
					SetConsoleCursorPosition(stdo, position);				
				}
			} 
			else
			if (key == 75)//<==
			{
				if (current!=0)
				{
					if (position.X!=0)					
						--position.X;
					else
					{
						position.X = lineLength[currentString - 1];
						position.Y--;
						currentString--;
					}
					--current;
					SetConsoleCursorPosition(stdo, position);					
				}
			} 
			else
			if (key == 72 && position.Y!=1)//UP
			{					
				    int lenA = lineLength[currentString-1];
					int lenB = position.X;

					if (lenB<=lenA)		
					{
						current -= lenB;
						current -= (lenA - lenB+1) ;
					}
					else
					{
						position.X = lenA;
						current -= (lenB+1);
					}
					currentString--;
					position.Y--;
			}
			else 
			if (key == 80 && position.Y!=SCREENY-1) //DOWN
			{
					if (position.Y != lineLength.size() )
					{
						int lenA = lineLength[currentString];
						int lenB = lineLength[currentString+1];

						current += (lenA-position.X+1);
						if (position.X<=lenB)
							current += position.X;						
						else 
						{
							current += lenB;
							position.X = lenB;
						}
									
					    position.Y++;
						SetConsoleCursorPosition(stdo, position);
						++currentString;					
					}			
			}		
			else 
			if (key==83) //DELETE!!!!
			{
				if (current != buffer.length())
				{
					buffer.erase(current, 1);
					
					system("cls");
					SetConsoleCursorPosition(stdo, ToCoord(0, 1));
					cout << buffer;
					SetConsoleCursorPosition(stdo, position);			
				}
			}
			continue;	
		}


		
		if (key >= 32 && key <= 128) // Letters
		{
			if (current == buffer.length())
			{
				buffer.push_back(c);
				WriteAt(position, c);
			}
			else
			{
				buffer.insert(current, 1, c);
				WriteAt(position, buffer.substr(current, buffer.length()-current));								
			}
			++position.X;
			SetConsoleCursorPosition(stdo, position);
			++current;
			continue;
		}	


		
		if (key == 13 && position.Y!=SCREENY-1)//Enter
		{
			if (current == buffer.length())
			{				
				buffer.push_back('\n');
			}
			else 
			{		
				buffer.insert(current, 1, '\n');
				system("cls");
				SetConsoleCursorPosition(stdo, ToCoord(0, 1));
				cout << buffer;
			}
			position.X = 0;
			++position.Y;
			SetConsoleCursorPosition(stdo, position);					
			++current;
			++currentString;
			continue;
		}
		


		if (key==8) //BackSpace
		{
			if (current != 0)
			{
				buffer.erase(current-1, 1);
				if (position.X==0)
				{ 
					position.Y--;
					position.X=lineLength[currentString-1];
					currentString--;
				}
				else 
					position.X--;

				current--;
				system("cls");
				SetConsoleCursorPosition(stdo, ToCoord(0, 1));
				cout << buffer;
				SetConsoleCursorPosition(stdo, position);			
			}
			continue;
		}
	}

	savePanel();


	///Debug Informations
	SetConsoleCursorPosition(stdo, ToCoord(0, 10));
	cout<<"\n################################\n";
	updateListOfEndl();
		
	cout<<buffer;
	cout<<"\nStrings Length \n";
	for (int i=0; i<lineLength.size(); ++i)
		cout<<lineLength[i]<<endl;
	cout<<"#############\n";

	//system("color 0f");
		return 0;
}
