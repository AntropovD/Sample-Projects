#define OEMRESOURCE
#include <Windows.h>

	HINSTANCE programHandle;
	HHOOK hookHandle;
	HANDLE hMutex;
	UINT_PTR timerHandle;
	HKL _layout=0;
	HCURSOR firstCursor;

void CALLBACK UpdateCursor(HWND /* hWnd */, UINT /* uMsg */, UINT_PTR /* idEvent */, DWORD /* dwTime */)
{
	HKL layout = GetKeyboardLayout(GetWindowThreadProcessId(GetForegroundWindow(), NULL));

	if (layout != _layout)
	{
		_layout=layout;		
		//cout<<(int(layout)&0xFFFF)<<endl;
		HCURSOR cursorHandle = LoadCursor(programHandle, MAKEINTRESOURCE(int(layout)&0xFFFF));		
		if (cursorHandle)
			SetSystemCursor(cursorHandle, OCR_IBEAM);
		else	
			SetSystemCursor(firstCursor, OCR_IBEAM);
	}
}

	
LRESULT CALLBACK LowLevelKeyboardHook(int actionCode, WPARAM wParam, LPARAM lParam)
{
	if (actionCode == HC_ACTION)
	{
		KBDLLHOOKSTRUCT *key = (KBDLLHOOKSTRUCT*)lParam;		
		if (key->vkCode==VK_F12)
		{			
			SetSystemCursor(firstCursor, OCR_IBEAM);			
			DestroyCursor(firstCursor);
			UnhookWindowsHookEx(hookHandle);
			ReleaseMutex(hMutex);
			exit(0);
		}
	}		
	return CallNextHookEx(hookHandle, actionCode, wParam, lParam);
}

int main() {

	hMutex = CreateMutex( NULL, FALSE, LPCWSTR( "MyMutex"));
	
	if (GetLastError() == ERROR_ALREADY_EXISTS || GetLastError() == ERROR_ACCESS_DENIED) 
			return 1 ;
	

	programHandle = GetModuleHandle(NULL);
	firstCursor = CopyCursor(LoadCursor(NULL, IDC_IBEAM));
	hookHandle = SetWindowsHookEx(WH_KEYBOARD_LL, LowLevelKeyboardHook, programHandle, 0);	
	timerHandle = SetTimer(NULL, timerHandle, 200, UpdateCursor);

	
	HCURSOR cursorHandle = LoadCursor(programHandle, MAKEINTRESOURCE(1033));
	SetSystemCursor(cursorHandle, OCR_IBEAM);

	MSG message;
	while (	GetMessage(&message, 0, 0, 0))
	{
		TranslateMessage(&message);
		DispatchMessage(&message);
	}

		SetSystemCursor(firstCursor, OCR_IBEAM);			
		DestroyCursor(firstCursor);
		UnhookWindowsHookEx(hookHandle);
		ReleaseMutex(hMutex);

	return 0;
}

EXTERN_C void WINAPI WinMainCRTStartup()
{
    ExitProcess(main());
} 
                           
