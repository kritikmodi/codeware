#include<stdio.h>
#include<iostream>

using namespace std;

int main(){
	int a=0,b=1,count=10;
	for (int i = 0; i < count; ++i)
	{
            cout << a << endl;
            c=b;
            b = a + b;
	    a = c;
	}
}

