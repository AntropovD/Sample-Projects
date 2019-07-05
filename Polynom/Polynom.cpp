#include <iostream>
#include <stdio.h>
#include <algorithm>
#include <vector>
#include <string.h>

using namespace std;

class Polynom{
public:
	int size;
	double *mas;

//----------------------------------------------------------------------
	Polynom(int n){		
		size = n;
		if (n>0){		
			mas = new double[size];
			for (int i=0; i<size; ++i)
				mas[i] = 0;
			mas[0]=1;
		}		
	}
	Polynom(int n, double *m){
		size = n;
		if (n>0){
			mas = new double[n];
			for (int i=0; i<n; i++)
				mas[i]=m[i];
		}
	}
	Polynom(const Polynom & T){	
		size = T.size;
		mas = new double[size];
		for (int i=0; i<size; i++)
			mas[i] = T.mas[i];
	}
	static Polynom *ZERO;
	
	~Polynom(){
		if (size!=0) delete [] mas;
	}
//----------------------------------------------------------------------
	Polynom & operator = (const Polynom & T){		
		delete []mas;	
		size = T.size;
		mas = new double[size];
		for (int i=0; i<size; i++)
			mas[i] = T.mas[i];
		return *this;	
	}
//----------------------------------------------------------------------
	Polynom operator * ( Polynom &T){
		int a = size;
		int b = T.size;
		Polynom ans(a+b);
		ans.mas[0]=0;
		
		for (int i=0; i<a; ++i)
			for (int j=0; j<b; ++j)
				ans.mas[i+j]+=mas[i]*T.mas[j];		
		ans.print();
		return ans;	
	}	
//----------------------------------------------------------------------
	Polynom operator + ( Polynom &T){
		int a = size;
		int b = T.size;
		int m = max(a,b);
		Polynom ans(m);
		a--;b--;m--; 
		while (a>=0 && b>=0){
			ans.mas[m] = mas[a] + T.mas[b];
			m--;a--;b--;
		}	
		while (a>=0){
			ans.mas[m] = mas[a];
			m--;a--;
		}
		while (b>=0){
			ans.mas[m] = T.mas[b];
			m--;b--;
		}
		return ans;
	}
//----------------------------------------------------------------------
	Polynom operator - ( Polynom &T){
		int a = size;
		int b = T.size;
		int m = max(a,b);
		Polynom ans(m);		
		a--;b--;m--; 
		while (a>=0 && b>=0){
			ans.mas[m] = mas[a] - T.mas[b];
			m--;a--;b--;
		}	
		while (a>=0){
			ans.mas[m] = mas[a];
			m--;a--;
		}
		while (b>=0){
			ans.mas[m] = -T.mas[b];
			m--;b--;
		}		
		return ans;
	}
//----------------------------------------------------------------------
	friend Polynom& operator+( Polynom& T){
		return T;
	}    
    friend Polynom& operator-(Polynom& T){
		for (int i=0; i<T.size; i++)
			T.mas[i] = -T.mas[i];
		return T;
	}	
//----------------------------------------------------------------------	
    template<class T> Polynom operator + (T value){		
		mas[size-1] += value;
		return *this;		
	}	
	template<class T> Polynom operator - (T value){		
		mas[size-1] -= value;
		return *this;		
	}	
	template<class T> Polynom operator * (T value){		
		for (int i=0; i<size; ++i)
			mas[i]*=value;
		return *this;		
	}	
	template<class T> Polynom operator / (T value){		
		if (value == 0) {
			std::cerr<<"error";
			return ZERO;
		}
		for (int i=0; i<size; ++i)
			mas[i]/=value;
		return *this;			
	}	
//----------------------------------------------------------------------	
//
    template<class T> friend Polynom operator + (T value, Polynom &A){		
		Polynom B(A);
		B.mas[B.size-1] += value;
		return B;		
	}	
	template<class T> friend Polynom operator - (T value, Polynom &A){		
		Polynom B(A);
		B.mas[B.size-1] -= value;
		return B;			
	}	
	template<class T> friend Polynom operator * (T value, Polynom &A){
		Polynom B(A);	
		for (int i=0; i<B.size; ++i)
			B.mas[i]*=value;
		return B;		
	}	
//----------------------------------------------------------------------	
	
	Polynom operator ++(){
		Polynom tmp(*this);
		mas[size-1]++;
		return tmp;		
	}	
	Polynom operator --(){
		Polynom tmp(*this);
		mas[size-1]--;
		return tmp;	
	}
	
	Polynom operator ++(int){		
		mas[size-1]++;
		return *this;	
	}		
	Polynom operator --(int){			
		mas[size-1]--;
		return *this;
	}
//----------------------------------------------------------------------
	friend ostream& operator << (ostream &stream, Polynom Pol){	
		if (Pol.size==0){
			stream<<"0";
			return stream;
		}		
		if (Pol.size==1){
			stream<<Pol.mas[0];
			return stream;
		}		
		if (Pol.mas[0]!=0)
			stream << Pol.mas[0]<<"X^"<<Pol.size-1;
		
		for (int i=1; i<Pol.size-1; i++)
			if (Pol.mas[i]>0)
				stream<<"+"<<Pol.mas[i]<<"X^"<<Pol.size-i-1;
			else if (Pol.mas[i]<0)
				stream<<Pol.mas[i]<<"X^"<<Pol.size-i-1;
			
		if (Pol.mas[Pol.size-1]>0)
			stream<<"+"<<Pol.mas[Pol.size-1];
		else if (Pol.mas[Pol.size-1]<0)
				stream<<Pol.mas[Pol.size-1];
		return stream;
	}
//----------------------------------------------------------------------
	double count(int x)	{
		double a = 1;
		double ans = 0;
		for (int i=size-1; i>=0; i--){
			ans+=mas[i]*a;
			a= a*x;
		}
		return ans;
	}
//----------------------------------------------------------------------
	void simple(){
		int t = size;
		int i;
		for (i=0; i<t; ++i)
			if (mas[i]!=0) break;
		Polynom T(*this);
		delete [] mas;
		size = T.size-i;
		for (int j=0; j<i; j++)
			mas[j] = T.mas[i+j];					
		return;	
	}
//----------------------------------------------------------------------
	void print(){
		std::cout<<size<<" ";
		for (int i=0; i<size; ++i)
			std::cout<<mas[i]<<" ";		
		return ;
	}
};

int main()
{	
	Polynom ZERO = new Polynom(0);
	cout<<Polynom::ZERO;
	double *mas = new double[4];
	mas[0]=1;mas[1]=2;mas[2]=3;mas[3]=4;

	Polynom p(0);
	Polynom p1(1);
	Polynom p2(111111111);
	 cout<<p;
	 cout<<sizeof(p1)<<" "<<sizeof(p2)<<" "<<sizeof(p);
  //  cout << p0 ;//<< ' ' << p1<<" "<<p2;

	// Polynom zero = Polynom::ZERO();
    //cout << zero; 
	//cout<<pol2;

	//cout<<pol.count(10);
	//cout<<pol2.count(10);
	//cout<<"\n";
	//~ Polynom pol3(pol2);
	//~ 
	//~ pol3=pol2 * pol2;
	//~ 
	//pol3.print();cout<< pol3;
	return 0;
}
